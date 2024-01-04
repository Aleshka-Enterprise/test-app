from django.urls import include, path
from rest_framework import routers

from tests.views import (CategoriesViewSet, TestResultAPIView, TestViewSet,
                         UserAnswerViewSet, create_new_question)

router = routers.DefaultRouter()
router.register('category', CategoriesViewSet)
router.register('user-answers', UserAnswerViewSet)
router.register(r'', TestViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('result/<test_id>/', TestResultAPIView.as_view()),
    path('create_new_question/<test_id>/', create_new_question)
]
