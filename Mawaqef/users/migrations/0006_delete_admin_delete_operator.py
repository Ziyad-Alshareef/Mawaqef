# Generated by Django 5.1.1 on 2024-09-24 23:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Admin',
        ),
        migrations.DeleteModel(
            name='Operator',
        ),
    ]
