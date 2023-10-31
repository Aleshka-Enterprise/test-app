from django.urls import path
from rest_framework.authtoken import views

from user.views import CreateUserAPIView

urlpatterns = [
    path('autorization/', views.obtain_auth_token),
    path('register/', CreateUserAPIView.as_view())
]
