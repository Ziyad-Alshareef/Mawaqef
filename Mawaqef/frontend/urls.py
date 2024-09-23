from django.urls import path
from .views import index


urlpatterns = [
  
    path('', index),
    path('login', index),
    path('Login', index),
    path('Logintwo', index),
]
