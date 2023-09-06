# Generated by Django 4.2.5 on 2023-09-06 13:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('test_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('bottle_size', models.FloatField()),
                ('bottles_in_crate', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Delivery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cost', models.FloatField()),
                ('brand', models.ManyToManyField(to='test_app.brand')),
            ],
        ),
        migrations.CreateModel(
            name='Inventory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bottle_amount', models.IntegerField()),
                ('money_value', models.FloatField()),
                ('brand', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, to='test_app.brand')),
            ],
        ),
        migrations.DeleteModel(
            name='Test',
        ),
    ]
