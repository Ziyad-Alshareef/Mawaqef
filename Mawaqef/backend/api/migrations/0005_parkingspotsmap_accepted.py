# Generated by Django 5.1.1 on 2024-10-08 20:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_parkingspotsmap_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='parkingspotsmap',
            name='accepted',
            field=models.BooleanField(default=False),
        ),
    ]