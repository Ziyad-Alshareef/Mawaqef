# Generated by Django 5.1.1 on 2024-10-16 19:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_operator'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='pin',
            field=models.CharField(blank=True, max_length=6, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='pin_expiration',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
