from django.db import models

# Create your models here.

class Cash(models.Model):
    cash_amount = models.DecimalFieldField(max_digits=6, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    type = models.CharField()

class Brand(models.Model):
    brand_name = models.CharField()
    bottles_per_crate = models.PositiveSmallIntegerField()

class Delivery(models.Model):
    date = models.DateField(auto_now_add=True)
    brand = models.ForeignKey(Cash)

class Delivery_Brands(models.Model):
    delivery_id = models.ForeignKey(Delivery)
    brand_id = models.ForeignKey(Brand)
    crate_amount = models.IntegerField()

