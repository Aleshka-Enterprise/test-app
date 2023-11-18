from django.urls import path
from rest_framework.authtoken import views

from user.views import CreateUserAPIView, get_current_user, LogoutAPIView

urlpatterns = [
    path('autorization/', views.obtain_auth_token),
    path('registration/', CreateUserAPIView.as_view()),
    path('get_current_user/', get_current_user),
    path('logout/', LogoutAPIView.as_view())
]
