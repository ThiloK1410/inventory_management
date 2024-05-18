from django.db import models

# Create your models here.


class InventoryItem(models.Model):
    brand_name = models.CharField(max_length=200)
    bottle_size = models.FloatField(null=True)
    crate_size = models.PositiveSmallIntegerField(null=True) # can be None
    bottle_amount = models.PositiveIntegerField(verbose_name="amount of bottles")

    def __str__(self):
        return self.brand_name
    
    class Meta:
        unique_together = ("brand_name", "bottle_size")
    
