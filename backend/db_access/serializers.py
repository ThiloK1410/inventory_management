from django.db import transaction
from rest_framework import serializers
from .models import Brand, BrandDelivery, Delivery, InventoryItem, Transaction


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"


# BrandSerializer without uniqueness check of the name
class SimplifiedBrandSerializer(BrandSerializer):
    name = serializers.CharField(max_length=200)

    class Meta(BrandSerializer.Meta):
        validators = []


class BrandDeliverySerializer(serializers.ModelSerializer):
    brand = SimplifiedBrandSerializer()

    class Meta:
        model = BrandDelivery
        exclude = ("delivery",)


class DeliverySerializer(serializers.ModelSerializer):
    cost = TransactionSerializer()
    brand_deliveries = BrandDeliverySerializer(many=True)

    class Meta:
        model = Delivery
        fields = "__all__"

    def validate(self, attrs):
        super().validate(attrs)
        if not attrs.get("brand_deliveries"):
            raise serializers.ValidationError(
                "There must be at least one crate in a delivery."
            )
        return attrs

    def create(self, validated_data):
        # Remove separately create fields from JSON
        cost_data = validated_data.pop("cost")
        brand_deliveries_list = validated_data.pop("brand_deliveries")

        with transaction.atomic():
            cost = Transaction.objects.create(**cost_data)

            # Use the remaining JSON to create Delivery
            delivery = Delivery.objects.create(cost=cost, **validated_data)

            # Create BrandDelivery for every item in the brand_deliveries_list
            for brand_delivery in brand_deliveries_list:
                brand, _ = Brand.objects.get_or_create(**brand_delivery.pop("brand"))
                brand_delivery = BrandDelivery.objects.create(
                    delivery=delivery, brand=brand, **brand_delivery
                )

                bottle_amount = brand.bottles_per_crate * brand_delivery.crate_amount
                inventory_item, created = InventoryItem.objects.get_or_create(
                    brand=brand,
                    defaults={"bottle_amount": bottle_amount},
                )

                if created:
                    continue
                
                inventory_item.bottle_amount += bottle_amount
                inventory_item.save()

            return delivery


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"


class InventorySerializer(serializers.ModelSerializer):
    brand = BrandSerializer()
    
    class Meta:
        model = InventoryItem
        fields = "__all__"
