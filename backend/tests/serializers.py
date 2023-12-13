from rest_framework import serializers

from .models import Test, Category, Question, Answer, UserAnswer
from user.models import User


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class CategorySerializer(serializers.ModelSerializer):
    title = serializers.CharField(read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'title']


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'answer_text']


class QuestionSerializer(serializers.ModelSerializer):
    answer_options = AnswerSerializer(many=True)
    right_answer = AnswerSerializer(write_only=True)

    class Meta:
        model = Question
        fields = ['id', 'question', 'answer_options', 'right_answer']


class UserAnswerSerializer(serializers.ModelSerializer):
    def save(self, **kwargs):
        # Сохраняем ответ если его не было ранее, либо обновляем уже существующий
        user_answer = UserAnswer.objects.filter(
            user=self.validated_data.get('user'),
            question=self.validated_data.get('question')
        )
        if user_answer.exists():
            user_answer = user_answer.first()
            user_answer.selected_answer = self.validated_data.get('selected_answer')
            user_answer.save()
        else:
            return super(UserAnswerSerializer, self).save()

    class Meta:
        model = UserAnswer
        fields = ['user', 'test', 'question', 'selected_answer', 'id']


class TestDetailSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    class Meta:
        model = Test
        fields = ['id', 'title', 'category', 'author', 'img', 'questions', 'description']


class TestListSerializer(serializers.ModelSerializer):
    """Упрощённый сериалайзер со списком тестов"""
    category = CategorySerializer()
    author = AuthorSerializer()

    class Meta:
        model = Test
        fields = ['id', 'title', 'category', 'author', 'img', 'description']


class TestResultSerializer(serializers.ModelSerializer):
    """Сериализатор для получения результата по тестам"""
    question = QuestionSerializer(read_only=True)
    right_answer = serializers.PrimaryKeyRelatedField(queryset=Answer.objects.all(), source='question.right_answer')

    class Meta:
        model = UserAnswer
        fields = ['id', 'question', 'right_answer', 'selected_answer']
