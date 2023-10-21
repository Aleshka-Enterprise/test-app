from rest_framework import viewsets

from .models import Test
from .serializers import TestDetailSerializer, TestListSerializer


class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return TestListSerializer
        return TestDetailSerializer


def test_a(request):
    '''Херумбула для тестов'''
    data = {
        'title': 'Вторая Мировая война',
        'category': 2,
        'author': 1,
        'description': 'пвф',
        'questions': [
            {
                'question': 'Кто начал войну',
                'answers': [{'answer_text': 'Франция'}, {'answer_text': 'Германия'}, {'answer_text': 'Америка'}, {'answer_text': 'СССР'}],
                'correct_answer': {'answer_text': 'Германия'},
            },
            {
                'question': 'В каком году началась война',
                'answers': [{'answer_text': '1999'}, {'answer_text': '1945'}, {'answer_text': '1941'},
                            {'answer_text': '1939'}],
                'correct_answer': {'answer_text': '1939'},
            },
        ],
    }

    serializer = TestDetailSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer.errors)

