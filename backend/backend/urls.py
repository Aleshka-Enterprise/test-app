from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from user.views import EmailVerificationView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/tests/', include('tests.urls')),
    path('api/user/', include('user.urls')),
    path('email_verification/<int:user_id>/<uuid:uuid>/', EmailVerificationView.as_view(), name='email_verification'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns.append(path("__debug__/", include('debug_toolbar.urls')))
