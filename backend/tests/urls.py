from django.urls import include, path
from rest_framework import routers

from tests.views import TestViewSet, test_a

router = routers.DefaultRouter()
router.register(r'tests', TestViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('aaaa/', test_a),
]
