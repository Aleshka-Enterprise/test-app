from django.urls import include, path
from rest_framework import routers

from tests.views import TestViewSet

router = routers.DefaultRouter()
router.register(r'', TestViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
