from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.mail import send_mail
from django.db import models
from django.urls import reverse
from django.utils.timezone import now
from django.db.models import signals

from datetime import timedelta
from uuid import uuid4


class User(AbstractUser):
    img = models.ImageField(upload_to='user', blank=True)
    is_verified = models.BooleanField(default=False, verbose_name='Почта подтверждена')

    def __str__(self):
        return self.username


class EmailVerification(models.Model):
    created = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    uuid = models.UUIDField(unique=True)
    expiration_date = models.DateTimeField(verbose_name='Срок годности')

    @classmethod
    def create_email_verification(cls, user_id):
        """Создает новый EmailVerification и возвращает uuid"""
        email_verification = cls.objects.create(created=now(), user_id=user_id, uuid=uuid4(),
                                                expiration_date=now() + timedelta(days=2))
        email_verification.save()
        return email_verification.uuid

    def __str__(self):
        return f'{self.user.username} | {self.uuid}'


def user_post_save(sender, instance, signal, *args, **kwargs):
    if not instance.is_verified:
        uuid = EmailVerification.create_email_verification(user_id=instance.id)
        link = reverse('email_verification', kwargs={'user_id': instance.id, 'uuid': uuid})
        message = (f'Для подтверждения учётной записи для {instance.username} перейдите по ссылке: '
                   f'{settings.DOMAIN_NAME}{link}')
        send_mail(
            subject=f'Подтверждение учётной записи для {instance.username}',
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[instance.email],
            fail_silently=False
        )


# signals.post_save.connect(user_post_save, sender=User)
