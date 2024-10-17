# Generated by Django 5.1.1 on 2024-10-17 11:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_user_pin_user_pin_expiration'),
    ]

    operations = [
        migrations.AddField(
            model_name='parkingspotsmap',
            name='email',
            field=models.EmailField(default='', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='parkingspotsmap',
            name='org',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
