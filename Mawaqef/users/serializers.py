from rest_framework import serializers
from .models import Admin
from .models import Operator

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model =Admin
        fields = ('id', 'email', 'password')


class OperatorSerializer(serializers.ModelSerializer):
    class Meta:
        model =Operator
        fields = ('id', 'organization' , 'name','email', 'password','phone_number','authorized')



class RegOperatorSerializer(serializers.ModelSerializer):
    class Meta:
        model =Operator
        fields = ('organization' , 'name','email', 'password','phone_number')

