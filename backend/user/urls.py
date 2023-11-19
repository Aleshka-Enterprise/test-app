from django.urls import path
from rest_framework.authtoken import views

from user.views import CreateUserAPIView, get_current_user, LogoutAPIView, CustomAuthToken

urlpatterns = [
    path('autorization/', CustomAuthToken.as_view()),
    path('registration/', CreateUserAPIView.as_view()),
    path('get_current_user/', get_current_user),
    path('logout/', LogoutAPIView.as_view())
]
