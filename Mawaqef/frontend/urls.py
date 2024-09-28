from django.urls import path
from .views import index


urlpatterns = [
  
    path('', index),
    path('signin', index),
    path('signup', index),
    path('admin', index),
]
