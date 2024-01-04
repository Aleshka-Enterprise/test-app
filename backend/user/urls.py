from django.urls import path

from user.views import (CreateUserAPIView, CustomAuthToken, LogoutAPIView,
                        get_current_user, upload_image, user_edit)

urlpatterns = [
    path('authorization/', CustomAuthToken.as_view(), name='authorization'),
    path('registration/', CreateUserAPIView.as_view(), name='registration'),
    path('get_current_user/', get_current_user, name='get_current_user'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('upload-image/', upload_image, name='upload_image'),
    path('user-edit/', user_edit, name='user_edit')
]
