from django.contrib import admin
from .models import Delivery, Transaction, Brand, InventoryItem, BrandDelivery

# Register your models here.

admin.site.register([Delivery, Transaction, Brand, BrandDelivery, InventoryItem])
