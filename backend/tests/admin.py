from django.contrib import admin

from tests.models import Answer, Category, Question, Test, UserAnswer

admin.site.register(Question)
admin.site.register(Test)
admin.site.register(Answer)
admin.site.register(Category)
admin.site.register(UserAnswer)
