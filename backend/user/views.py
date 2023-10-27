from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from user.serializers import UserSerializer
from rest_framework.permissions import AllowAny


class CreateUserAPIView(CreateAPIView):
    model = get_user_model()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
