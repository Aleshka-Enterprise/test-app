# Generated by Django 4.2.6 on 2023-11-19 14:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='img',
            field=models.ImageField(blank=True, upload_to='user'),
        ),
    ]
