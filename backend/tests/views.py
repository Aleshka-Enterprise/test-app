from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Test, Category, UserAnswer
from .serializers import TestDetailSerializer, TestListSerializer, CategorySerializer, UserAnswerSerializer, \
    TestResultSerializer


class TestViewSetPagination(PageNumberPagination):
    page_size = 10


class TestViewSet(viewsets.ModelViewSet):
    """ViewSet для работы с тестами"""
    queryset = Test.objects.select_related('author', 'category')
    pagination_class = TestViewSetPagination
    permission_classes = [AllowAny]
    serializer_class = TestDetailSerializer

    def get_queryset(self):
        if self.action != 'list':
            return super(TestViewSet, self).get_queryset()
        else:
            queryset = (Test.objects.select_related('author', 'category')
                        .filter(title__contains=self.request.query_params.get('search', ''), is_published=True)
                        .order_by('date_of_creation'))
            if self.request.query_params.get('category_id'):
                queryset = queryset.filter(category_id=self.request.query_params.get('category_id'))
            return queryset

    def get_serializer_class(self):
        # Если не получаем id, то выдаём упрощенный объект
        if self.action == 'list':
            return TestListSerializer
        return TestDetailSerializer


class CategoriesViewSet(viewsets.ModelViewSet):
    """ViewSet для работы с категориями"""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            self.permission_classes = [IsAdminUser]
        return super(CategoriesViewSet, self).get_permissions()


class UserAnswerViewSet(viewsets.ModelViewSet):
    """ViewSet для работы с ответами пользователя"""
    serializer_class = UserAnswerSerializer
    permission_classes = [IsAuthenticated]
    queryset = UserAnswer.objects.all()

    def get_queryset(self):
        if self.request.query_params.get('test_id'):
            return UserAnswer.objects.filter(user=self.request.user, test_id=self.request.query_params.get('test_id'))
        return UserAnswer.objects.filter(user=self.request.user)


class TestResultAPIView(APIView):
    """Результат тестирования"""
    serializer_class = TestResultSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        data = UserAnswer.objects.filter(user=self.request.user, test_id=kwargs.get('test_id'))

        serializer = self.serializer_class(data, many=True)
        serialized_data = serializer.data

        return Response(serialized_data)

    def delete(self, request, *args, **kwargs):
        """Удаление результатов тестирования"""
        UserAnswer.objects.filter(user_id=self.request.user.id, test_id=kwargs['test_id']).delete()
        return Response({'message': 'Ресурс успешно удален'})
