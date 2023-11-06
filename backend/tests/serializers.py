from django.core.exceptions import ValidationError
from rest_framework import serializers

from .models import Test, Category, Question, Answer, UserAnswer
from user.models import User


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title']


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'answer_text']


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)
    correct_answer = AnswerSerializer(write_only=True)

    class Meta:
        model = Question
        fields = ['id', 'question', 'answers', 'correct_answer']


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
    questions = QuestionSerializer(many=True)
    category = CategorySerializer()

    class Meta:
        model = Test
        fields = ['id', 'title', 'category', 'author', 'img', 'questions', 'description']

    def validate(self, attrs):
        questions = attrs.get('questions', [])

        for question in questions:
            correct_answer_text = question['correct_answer']['answer_text']

            if not correct_answer_text:
                raise ValidationError('Поле answer не заполнено!'.format(correct_answer_text))
            if len(question['answers']) != 4:
                raise ValidationError('Должно быть ровно 4 варианта ответа!'.format(correct_answer_text))
            if not any([correct_answer_text == i['answer_text'] for i in question['answers']]):
                raise ValidationError(
                    'Правильный ответ должен быть среди вариантов ответов!'.format(correct_answer_text))

        return attrs


class TestListSerializer(serializers.ModelSerializer):
    """Упрощённый сериалайзер со списком тестов"""
    category = CategorySerializer()
    author = AuthorSerializer()

    class Meta:
        model = Test
        fields = ['id', 'title', 'category', 'author', 'img', 'description']
