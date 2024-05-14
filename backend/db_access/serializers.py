from django.db import transaction
from rest_framework import serializers
from .models import InventoryItem


class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = ["id", "brand_name", "bottle_size", "crate_size", "bottle_amount"]
