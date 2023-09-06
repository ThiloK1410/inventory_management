from django.db import models

# Create your models here.
# (Model as in "abstract database modelling")
# Ergo: a model models an SQL database without the editor having to write SQL code


class Brand(models.Model):
    name = models.CharField(max_length=20)
    bottle_size = models.FloatField()
    bottles_in_crate = models.IntegerField()

class Inventory(models.Model):
    brand = models.OneToOneField(Brand, on_delete=models.DO_NOTHING)
    bottle_amount = models.IntegerField()
    money_value = models.FloatField()

class Delivery(models.Model):
    brand = models.ManyToManyField(Brand)
    cost = models.FloatField()