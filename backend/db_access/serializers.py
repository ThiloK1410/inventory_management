from rest_framework import serializers
from .models import Delivery, Brand, Transaction

class DeliverySerializer(serializers.ModelSerializer):
    brand = serializers.SlugRelatedField(slug_field="name", many=True, read_only=True)
    class Meta:
        model = Delivery
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"
