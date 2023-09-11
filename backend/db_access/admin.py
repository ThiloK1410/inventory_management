from django.contrib import admin
from .models import Delivery, Transaction, Brand, BrandDelivery

# Register your models here.

admin.site.register([Delivery, Transaction, Brand])
