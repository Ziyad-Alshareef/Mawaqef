from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from users.models import Admin
from users.serializers import AdminSerializer
from users.serializers import OperatorSerializer
from users.models import Operator

# Create your views here.

#def main(request):
#    return HttpResponse("hi")

class AdminView(generics.ListAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class OperatorView(generics.ListAPIView):
    queryset = Operator.objects.all()
    serializer_class = OperatorSerializer