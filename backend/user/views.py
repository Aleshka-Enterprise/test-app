from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from user.serializers import UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated


class CreateUserAPIView(CreateAPIView):
    """Регистрация"""
    model = get_user_model()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    """Возвращает текущего пользователя"""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
