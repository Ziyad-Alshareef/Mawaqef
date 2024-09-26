from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from users.models import Admin
from users.serializers import AdminSerializer, OperatorSerializer, RegOperatorSerializer
from users.models import Operator
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.

#def main(request):
#    return HttpResponse("hi")

class AdminView(generics.ListAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class OperatorView(generics.ListAPIView):
    queryset = Operator.objects.all()
    serializer_class = OperatorSerializer

class RegOperatorView(APIView):
    serializer_class = RegOperatorSerializer

    def post(self, request, format=None):
        pass


