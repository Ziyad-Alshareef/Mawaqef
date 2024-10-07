from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('operator', 'Operator'),
    )

    email = models.EmailField(max_length=255, unique=True)  # Unique email
    password = models.CharField(max_length=255)  # Password field
    phone_number = models.CharField(max_length=15, blank=True, null=True)  # Phone number for Operators
    organization = models.CharField(max_length=255, unique=True, blank=True, null=True)  # Organization for Operators
    role = models.CharField(max_length=8, choices=ROLE_CHOICES, default='operator')  # Role (admin or operator)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    authorized = models.BooleanField(default=False)  # Specific for Operators, if applicable

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title




from django.utils import timezone
import random
import threading
import time
from django.conf import settings

class ParkingSpotsMap(models.Model):
    operator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # assuming you use Django's built-in User model
    name=models.CharField(max_length=10)
    length = models.IntegerField()
    width = models.IntegerField()
    orientation = models.CharField(max_length=10, choices=[('horizontal', 'Horizontal'), ('vertical', 'Vertical')])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Map {self.id} by {self.operator.email}"

class ParkingSpot(models.Model):
    parking_spots_map = models.ForeignKey(ParkingSpotsMap, on_delete=models.CASCADE)
    x_axis = models.IntegerField()
    y_axis = models.IntegerField()
    sensor_status = models.CharField(max_length=10, choices=[('used', 'Used'), ('unused', 'Unused')])
    status = models.CharField(max_length=20, choices=[
        ('sensor', 'Sensor Status'),
        ('maintenance', 'Maintenance'),
        ('unavailable', 'Unavailable'),
        ('road', 'Road')
    ], default='sensor')

    def __str__(self):
        return f"Parking Spot {self.id}"
    
    def flip_status(self):
        if self.sensor_status == 'unused' and random.random() < 0.15:
            self.sensor_status = 'used'
        elif self.sensor_status == 'used' and random.random() < 0.10:
            self.sensor_status = 'unused'
        self.save()

class VirtualSensor(models.Model):
    parking_spot = models.OneToOneField(ParkingSpot, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=[('used', 'Used'), ('unused', 'Unused')], default='unused')

    def __str__(self):
        return f"Sensor for Spot {self.parking_spot.id}"

    def flip_status(self):
        if self.status == 'unused' and random.random() < 0.15:
            self.status = 'used'
        elif self.status == 'used' and random.random() < 0.10:
            self.status = 'unused'
        self.save()

def run_virtual_sensor_algorithm():
    while True:
        for spot in ParkingSpot.objects.all():
            spot.flip_status()
        time.sleep(10)  # Run every 10 seconds

# Starting the background algorithm
thread = threading.Thread(target=run_virtual_sensor_algorithm)
thread.daemon = True
thread.start()
