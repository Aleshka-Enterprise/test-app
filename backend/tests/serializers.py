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
    class Meta:
        model = UserAnswer
        fields = '__all__'


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

    def create(self, validated_data):
        questions_data = validated_data.pop('questions')

        test = Test.objects.create(
            title=validated_data['title'],
            description=validated_data['description'],
            category=validated_data['category'],
            author=validated_data['author']
        )

        for question_data in questions_data:
            correct_answer, _ = Answer.objects.get_or_create(
                answer_text=question_data['correct_answer']['answer_text']
            )
            question = Question.objects.create(
                test=test,
                question=question_data['question'],
                correct_answer=correct_answer
            )

            for answer_data in question_data['answers']:
                answer, _ = Answer.objects.get_or_create(
                    answer_text=answer_data['answer_text']
                )
                question.answers.add(answer)

        return test


class TestListSerializer(serializers.ModelSerializer):
    """Упрощённый сериалайзер со списком тестов"""
    category = CategorySerializer()
    author = AuthorSerializer()

    class Meta:
        model = Test
        fields = ['id', 'title', 'category', 'author', 'img', 'description']
