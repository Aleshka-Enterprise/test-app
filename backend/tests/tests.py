from django.test import TestCase

from .models import Category


class CatalogModelTests(TestCase):
    """Тест модели категорий"""

    def setUp(self):
        self.book = Category(
            title='История'
        )

    def test_create_book(self):
        self.assertIsInstance(self.book, Category)

    def test_str_representation(self):
        self.assertEquals(str(self.book), 'История')

    def test_saving_and_retrieving_book(self):
        Category(title='Исторя').save()
        Category(title='Космос').save()

        saved_categories = Category.objects.all()

        self.assertEqual(saved_categories.count(), 2)
        self.assertEqual(saved_categories[0].title, 'Исторя')
        self.assertEqual(saved_categories[1].title, 'Космос')
