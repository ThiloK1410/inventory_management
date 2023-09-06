from django.db import models

# Create your models here.

class Cash(models.Model):
    cash_amount = models.DecimalField(max_digits=6, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    type = models.CharField(max_length=200)

class Brand(models.Model):
    brand_name = models.CharField(max_length=200)
    bottles_per_crate = models.PositiveSmallIntegerField()

class Delivery(models.Model):
    date = models.DateField(auto_now_add=True)
    brand = models.OneToOneField(Cash, on_delete=models.DO_NOTHING)

class Delivery_Brands(models.Model):
    delivery_id = models.OneToOneField(Delivery, on_delete=models.DO_NOTHING)
    brand_id = models.OneToOneField(Brand, on_delete=models.DO_NOTHING)
    crate_amount = models.IntegerField()

