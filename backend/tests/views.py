from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Answer, Category, Question, Test, UserAnswer
from .serializers import (CategorySerializer, QuestionSerializer,
                          TestDetailSerializer, TestListSerializer,
                          TestResultSerializer, UserAnswerSerializer)


class TestViewSetPagination(PageNumberPagination):
    page_size = 9


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
                        .filter(title__contains=self.request.query_params.get('search', ''))
                        .order_by('date_of_creation'))
            if self.request.query_params.get('categoryId'):
                queryset = queryset.filter(category_id=self.request.query_params.get('categoryId'))
            if self.request.query_params.get('author'):
                queryset = queryset.filter(author_id=self.request.query_params.get('author'))
            if not self.request.query_params.get('published'):
                queryset = queryset.filter(is_published=True)
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


class QuestionAPIView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = QuestionSerializer

    def post(self, request, *args, **kwargs):
        """ Создаёт новый вопрос в тесте """
        question_text = request.data.get('question')
        options = request.data.get('options')
        right_answer_text = request.data.get('right_answer')

        if right_answer_text not in options:
            return Response({'error': 'Правельного ответа нет среди вариантов ответа'},
                            status=status.HTTP_404_NOT_FOUND)

        test = get_object_or_404(Test, id=kwargs.get("test_id"))

        question = Question.objects.create(test=test, question=question_text)

        answer_objects = []
        new_options = []

        for option_text in options:
            option, created = Answer.objects.get_or_create(answer_text=option_text)
            answer_objects.append(option)
            if created:
                new_options.append(option)

        Answer.objects.bulk_create(new_options)

        right_answer, created = Answer.objects.get_or_create(answer_text=right_answer_text)
        question.right_answer = right_answer

        question.answer_options.set(answer_objects)

        serializer = QuestionSerializer(question)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        question_text = request.data.get('question')
        question_id = request.data.get('id')

        question = Question.objects.get(id=question_id)
        question.question = question_text
        question.save()

        serializer = QuestionSerializer(question)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
