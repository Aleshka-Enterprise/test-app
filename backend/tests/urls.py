from django.urls import include, path
from rest_framework import routers

from tests.views import TestViewSet, CategoriesViewSet, UserAnswerViewSet, TestResultAPIView

router = routers.DefaultRouter()
router.register('category', CategoriesViewSet)
router.register('user-answers', UserAnswerViewSet)
router.register(r'', TestViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('result/<test_id>/', TestResultAPIView.as_view())
]
