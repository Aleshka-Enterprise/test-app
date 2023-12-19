from django.urls import path

from user.views import CreateUserAPIView, get_current_user, LogoutAPIView, CustomAuthToken, upload_image, user_edit

urlpatterns = [
    path('autorization/', CustomAuthToken.as_view(), name='autorization'),
    path('registration/', CreateUserAPIView.as_view(), name='registration'),
    path('get_current_user/', get_current_user, name='get_current_user'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('upload-image/', upload_image, name='upload_image'),
    path('user-edit/', user_edit, name='user_edit')
]
