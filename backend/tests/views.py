from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination

from .models import Test
from .serializers import TestDetailSerializer, TestListSerializer


class TestViewSetPagination(PageNumberPagination):
    page_size = 10


class TestViewSet(viewsets.ModelViewSet):
    """ViewSet для работы с тестами"""
    queryset = Test.objects.all()
    pagination_class = TestViewSetPagination

    def get_serializer_class(self):
        if self.action == 'list':
            return TestListSerializer
        return TestDetailSerializer

