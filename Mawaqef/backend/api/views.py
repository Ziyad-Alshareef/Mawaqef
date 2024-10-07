from django.shortcuts import render
from api.models import User
from rest_framework.views import APIView
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, OperatorAuthorizeSerializer,OperatorSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
from rest_framework.response import Response
from rest_framework import status

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer



class UnapprovedOperatorsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != "admin":
            return Response({"detail": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        operators = User.objects.filter(role="operator", authorized=False)
        serializer = OperatorSerializer(operators, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AuthorizeOperatorView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, operator_id):
        if request.user.role != "admin":
            return Response({"detail": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        try:
            operator = User.objects.get(id=operator_id, role="operator")
        except User.DoesNotExist:
            return Response({"detail": "Operator not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = OperatorAuthorizeSerializer(operator, data={"authorized": True}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RejectOperatorView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, operator_id):
        # Check if the user is an admin
        if request.user.role != "admin":
            return Response({"detail": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        # Attempt to retrieve the operator
        try:
            operator = User.objects.get(id=operator_id, role="operator")
        except User.DoesNotExist:
            return Response({"detail": "Operator not found"}, status=status.HTTP_404_NOT_FOUND)

        # Delete the operator from the database
        operator.delete()
        return Response({"detail": "Operator deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
    
    
class AllAuthorizedOperatorsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != "admin":
            return Response({"detail": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        operators = User.objects.filter(role="operator", authorized=True)
        serializer = OperatorSerializer(operators, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ParkingSpotsMap, ParkingSpot, VirtualSensor
from .serializers import ParkingSpotsMapSerializer, ParkingSpotSerializer

class CreateParkingSpotsMapView(APIView):
    def post(self, request):
        if request.user.is_authenticated and request.user.role == 'operator':
            length = request.data.get('length')
            width = request.data.get('width')
            orientation = request.data.get('orientation')
            
            parking_map = ParkingSpotsMap.objects.create(
                operator=request.user,
                length=length,
                width=width,
                orientation=orientation
            )
            
            # Automatically generate parking spots and sensors
            for x in range(width):
                for y in range(length):
                    spot = ParkingSpot.objects.create(
                        parking_spots_map=parking_map,
                        x_axis=x,
                        y_axis=y,
                        sensor_status='unused'
                    )
                    VirtualSensor.objects.create(parking_spot=spot)
                    
            return Response({"detail": "ParkingSpotsMap created and spots generated"}, status=status.HTTP_201_CREATED)
        return Response({"detail": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

class ParkingSpotsMapView(APIView):
    def get(self, request, operator_id):
        try:
            parking_map = ParkingSpotsMap.objects.filter( operator_id=operator_id)
            pS=ParkingSpotsMapSerializer(parking_map, many=True)
            return Response(pS.data)
        except ParkingSpotsMap.DoesNotExist:
            return Response({"detail": "Map not found"}, status=status.HTTP_404_NOT_FOUND)

'''

class ParkingSpotsMapView(APIView):
    def get(self, request, operator_id):
        try:
            parking_map = ParkingSpotsMap.objects.get( operator_id=operator_id)
            spots = ParkingSpot.objects.filter(parking_spots_map_id=parking_map.id)
            spots_serializer = ParkingSpotSerializer(spots, many=True)
            return Response(spots_serializer.data)
        except ParkingSpotsMap.DoesNotExist:
            return Response({"detail": "Map not found"}, status=status.HTTP_404_NOT_FOUND)

'''