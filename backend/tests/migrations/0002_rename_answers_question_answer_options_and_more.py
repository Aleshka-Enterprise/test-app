# Generated by Django 4.2.6 on 2023-11-08 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tests', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='question',
            old_name='answers',
            new_name='answer_options',
        ),
        migrations.RenameField(
            model_name='question',
            old_name='correct_answer',
            new_name='right_answer',
        ),
        migrations.AlterField(
            model_name='test',
            name='date_of_published',
            field=models.DateTimeField(null=True, verbose_name='Дата публикации'),
        ),
    ]
