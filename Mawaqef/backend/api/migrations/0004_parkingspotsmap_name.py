# Generated by Django 5.1.1 on 2024-10-07 21:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_parkingspotsmap_parkingspot_virtualsensor'),
    ]

    operations = [
        migrations.AddField(
            model_name='parkingspotsmap',
            name='name',
            field=models.CharField(default='test', max_length=10),
            preserve_default=False,
        ),
    ]