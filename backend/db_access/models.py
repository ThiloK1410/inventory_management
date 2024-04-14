from django.db import models

# Create your models here.


class Transaction(models.Model):
    cash_amount = models.DecimalField(max_digits=6, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.type}: {self.cash_amount}€"


class Brand(models.Model):
    name = models.CharField(max_length=200)
    bottle_size = models.FloatField()
    bottles_per_crate = models.PositiveSmallIntegerField()

    class Meta:
        unique_together = ("name", "bottle_size")

    def __str__(self):
        return self.name


class Delivery(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    # The Transaction can't be deleted if it is referenced here.
    cost = models.ForeignKey(Transaction, on_delete=models.PROTECT)

    def __str__(self):
        return f"{self.date}, {self.cost}"


class BrandDelivery(models.Model):
    # A brand can't be deleted if it is referenced here.
    brand = models.ForeignKey(Brand, on_delete=models.PROTECT)
    # When a delivery is deleted all related records of BrandDelivery are deleted as well.
    delivery = models.ForeignKey(
        Delivery, on_delete=models.CASCADE, related_name="brand_deliveries"
    )
    crate_amount = models.IntegerField()

    class Meta:
        # This prevents multiple BrandDeliveries for the same Brand in a Delivery.
        unique_together = ("brand", "delivery")

class InventoryItem(models.Model):
    brand_name = models.CharField(max_length=200, null=True)
    bottle_size = models.FloatField(null=True)
    bottles_per_crate = models.PositiveSmallIntegerField(null=True) # can be None
    bottle_amount = models.PositiveIntegerField(verbose_name="amount of bottles")

    def __str__(self):
        return self.brand_name
    
    class Meta:
        unique_together = ("brand_name", "bottle_size")
    
