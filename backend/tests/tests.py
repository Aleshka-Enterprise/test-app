from django.test import TestCase

from .models import Category, Test
from user.models import User


class CatalogModelTests(TestCase):
    """Тест модели категорий"""

    def setUp(self):
        self.category = Category(title='История')

    def test_create_category(self):
        self.assertIsInstance(self.category, Category)

    def test_str_representation(self):
        self.assertEquals(str(self.category), 'История')

    def test_saving_and_retrieving_category(self):
        Category(title='Исторя').save()
        Category(title='Космос').save()

        saved_categories = Category.objects.all()

        self.assertEqual(saved_categories.count(), 2)
        self.assertEqual(saved_categories[0].title, 'Исторя')
        self.assertEqual(saved_categories[1].title, 'Космос')


class TestModelTests(TestCase):
    """Тест модели Test"""

    def setUp(self):
        self.category = Category(title='История')
        self.user = User(
            username='user',
            email='user@user.com',
            password='password123!',
            first_name='user_first_name'
        )
        self.category.save()
        self.user.save()

        self.test = Test(
            title='История Греции',
            description='Тест посвящен истории древней Греции',
            category=self.category,
            author=self.user
        )

    def test_create_test(self):
        self.assertIsInstance(self.test, Test)

    def test_str_representation(self):
        self.assertEquals(str(self.test), 'История Греции')

    def test_saving_and_retrieving_test(self):
        self.assertEqual(Test.objects.all().count(), 0)

        self.test.save()

        saved_test = Test.objects.all()
        self.assertEqual(saved_test.count(), 1)
        self.assertEqual(saved_test[0].title, 'История Греции')
