# Generated by Django 4.2.5 on 2023-09-14 20:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_access', '0002_branddelivery_alter_delivery_cost_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='brand',
            name='name',
            field=models.CharField(max_length=200, unique=True),
        ),
        migrations.AlterField(
            model_name='delivery',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterUniqueTogether(
            name='branddelivery',
            unique_together={('brand', 'delivery')},
        ),
    ]
