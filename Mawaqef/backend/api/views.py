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
