from django.urls import include, path
from rest_framework import routers

from tests.views import (CategoriesViewSet, TestResultAPIView, TestViewSet,
                         UserAnswerViewSet, QuestionAPIView)

router = routers.DefaultRouter()
router.register('category', CategoriesViewSet)
router.register('user-answers', UserAnswerViewSet)
router.register(r'', TestViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('result/<test_id>/', TestResultAPIView.as_view()),
    path('question/<test_id>/', QuestionAPIView.as_view())
]
