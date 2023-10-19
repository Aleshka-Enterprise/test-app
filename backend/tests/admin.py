from django.contrib import admin

from tests.models import Test, Question, Answer, Category


class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 4


# @admin.register(Question)
# class QuestionAdmin(admin.ModelAdmin):
#     pass

admin.site.register(Question)
admin.site.register(Test)
admin.site.register(Answer)
admin.site.register(Category)
