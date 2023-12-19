from django.contrib.auth import get_user_model
from django.views.generic import TemplateView
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from user.models import EmailVerification, User
from user.serializers import UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated


class CreateUserAPIView(CreateAPIView):
    """ Регистрация """
    model = get_user_model()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def handle_exception(self, exc):
        return Response({'Что-то пошло не так!'}, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    """ Возвращает текущего пользователя """
    serializer = UserSerializer(request.user, context={'request': request})
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_image(request):
    """ Обновляет картинку у пользователя """
    user = User.objects.get(id=request.user.id)
    user.img = request.data.get('image')
    user.save()
    serializer = UserSerializer(request.user, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def user_edit(request):
    """ Редактирование пользователя """
    user = request.user
    username = request.data.get('username')

    if not username:
        return Response({'errorMessage': 'Поле username не может быть пустым!'}, status=status.HTTP_400_BAD_REQUEST)
    elif username != request.user.username and User.objects.filter(username=username).exists():
        return Response({'errorMessage': 'Пользователь с таким же username уже зарегестрирован!'},
                        status=status.HTTP_400_BAD_REQUEST)

    user.username = username
    user.first_name = request.data.get('first_name', '')
    user.last_name = request.data.get('last_name', '')
    user.save()
    serializer = UserSerializer(request.user, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


class LogoutAPIView(APIView):
    def get(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class CustomAuthToken(ObtainAuthToken):
    """ Авторизация по токену """
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        return Response({'token': token.key})

    def handle_exception(self, exc):
        return Response({'errorMessage': 'Неверный логин или пароль!'}, status=400)


class EmailVerificationView(TemplateView):
    """ Верефикация пользователя через email """
    template_name = 'user/email_verification.html'

    def get(self, request, *args, **kwargs):
        res = super().get(EmailVerificationView, self)
        email_verification = EmailVerification.objects.filter(uuid=kwargs.get('uuid'))
        if email_verification.exists():
            email_verification = email_verification.first()
            user = email_verification.user
            user.is_verified = True
            user.save()

        return res

    def get_context_data(self, **kwargs):
        email_verification = EmailVerification.objects.filter(uuid=self.kwargs.get('uuid'))
        if email_verification.exists():
            if email_verification.first().user.is_verified:
                return {
                    'title': 'Ошибка!',
                    'message': 'Почта уже подтверждена!',
                }
            return {
                'title': 'Поздравляем',
                'message': 'Ваша учетная запись успешно подтверждена!',
            }
        else:
            return {
                'title': 'Что-то пошло не так!',
                'message': 'Пользователь не найден',
            }
