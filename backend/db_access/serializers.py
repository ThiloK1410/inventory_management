from rest_framework import serializers
from .models import BrandDelivery, Delivery, Brand, Inventory, Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"

class BrandDeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = BrandDelivery
        exclude = ("delivery",)

class DeliverySerializer(serializers.ModelSerializer):
    cost = TransactionSerializer()
    brand_deliveries = BrandDeliverySerializer(many=True)

    class Meta:
        model = Delivery
        fields = '__all__'
    
    def create(self, validated_data):
        # Remove separately create fields from JSON
        cost = Transaction.objects.create(**validated_data.pop("cost"))
        brand_deliveries_list = validated_data.pop("brand_deliveries")

        # Use the remaining JSON to create Delivery
        delivery = Delivery.objects.create(cost=cost, **validated_data)

        # Create BrandDelivery for every item in the brand_deliveries_list
        for brand_delivery in brand_deliveries_list: 
            BrandDelivery.objects.create(delivery=delivery, **brand_delivery)

        return delivery

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = "__all__"