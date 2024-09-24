from django.db import models

# Create your models here.
# Model for Admin
class Admin(models.Model):
    email = models.EmailField(max_length=255, unique=True)  # Ensures email is unique
    password = models.CharField(max_length=255)  # Password field

    def __str__(self):
        return self.email

# Model for Operator
class Operator(models.Model):
    organization = models.CharField(max_length=255)  # Organization name
    email = models.EmailField(max_length=255, unique=True)  # Ensures email is unique
    password = models.CharField(max_length=255)  # Password field
    phone_number = models.CharField(max_length=15)  # Phone number field
    authorized = models.BooleanField(default=False)  # Boolean field for authorization status
    name = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.organization} - {self.email}'