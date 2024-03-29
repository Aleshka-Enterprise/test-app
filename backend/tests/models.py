from django.db import models

from user.models import User


class Category(models.Model):
    title = models.CharField(max_length=128, verbose_name='Название', unique=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class Test(models.Model):
    title = models.CharField(max_length=128, verbose_name='Название', unique=True)
    description = models.TextField(blank=True, null=True, verbose_name='Описание')
    category = models.ForeignKey(to=Category, on_delete=models.CASCADE, verbose_name='Категория')
    author = models.ForeignKey(to=User, on_delete=models.SET_NULL, null=True, verbose_name='Автор')
    img = models.ImageField(upload_to='test_img', verbose_name='Изображение', blank=True)
    date_of_creation = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания', blank=True)
    date_of_published = models.DateTimeField(verbose_name='Дата публикации', null=True, blank=True)
    is_published = models.BooleanField(default=False, verbose_name='Опубликовано')

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.pk:
            # проверяем, является ли объект новым (еще не сохраненным в базе данных)
            # генерируем уникальное название теста
            slug = self.title
            count = 2
            while Test.objects.filter(title=slug).exists():
                slug = f"{self.title} пользователя {self.author.username} #{count}"
                count += 1
            self.title = slug if slug else self.title
        super().save(*args, **kwargs)

    def validate_constraints(self, exclude=None):
        self.save()
        if self.question_set.count() == 0 and self.is_published:
            raise ValueError("Невозможно опубликовать! В тесте нет ни одного вопроса")
        return super(Test, self).validate_constraints()

    class Meta:
        verbose_name = 'Тест'
        verbose_name_plural = 'Тесты'

    @property
    def questions(self):
        return self.question_set.all()


class Answer(models.Model):
    answer_text = models.CharField(max_length=128, verbose_name='Ответ', unique=True)

    def __str__(self):
        return self.answer_text

    class Meta:
        verbose_name = 'Вариант ответа'
        verbose_name_plural = 'Варианты ответов'


class Question(models.Model):
    test = models.ForeignKey(to=Test, on_delete=models.CASCADE, verbose_name='Тест')
    img = models.ImageField(upload_to='question_img', verbose_name='Изображение', blank=True)
    question = models.TextField(verbose_name='Вопрос')
    answer_options = models.ManyToManyField(to=Answer, related_name='questions')
    right_answer = models.ForeignKey(
        to=Answer,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name='Правильный ответ'
    )

    class Meta:
        verbose_name = 'Вопрос'
        verbose_name_plural = 'Вопросы'

    def __str__(self):
        return self.question


class UserAnswer(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, verbose_name='Пользователь')
    test = models.ForeignKey(to=Test, on_delete=models.CASCADE, verbose_name='Тест')
    question = models.ForeignKey(to=Question, on_delete=models.CASCADE, verbose_name='Вопрос')
    selected_answer = models.ForeignKey(to=Answer, on_delete=models.CASCADE, verbose_name='Ответ')

    def __str__(self):
        return f'{self.user.username} - {self.test.title} - {self.selected_answer.answer_text}'

    class Meta:
        verbose_name = 'Ответ пользователя'
        verbose_name_plural = 'Ответы пользователей'
