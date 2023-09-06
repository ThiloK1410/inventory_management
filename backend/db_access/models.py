from django.db import models

# Create your models here.

class Transaction(models.Model):
    cash_amount = models.DecimalField(max_digits=6, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    type = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.type}: {self.cash_amount}€"

class Brand(models.Model):
    name = models.CharField(max_length=200)
    bottle_size = models.FloatField()
    bottles_per_crate = models.PositiveSmallIntegerField()

class Delivery(models.Model):
    date = models.DateField(auto_now_add=True)
    cost = models.ForeignKey(Transaction, on_delete=models.DO_NOTHING)

    def __str__(self):
        return f"{self.date}, {self.cost}"

class Delivery_Brands(models.Model):
    delivery_id = models.OneToOneField(Delivery, on_delete=models.DO_NOTHING)
    brand_id = models.OneToOneField(Brand, on_delete=models.DO_NOTHING)
    crate_amount = models.IntegerField()

