from django.urls import path
from rest_framework.authtoken import views

from user.views import CreateUserAPIView, get_current_user

urlpatterns = [
    path('autorization/', views.obtain_auth_token),
    path('register/', CreateUserAPIView.as_view()),
    path('get_current_user/', get_current_user),
]
