# test-app
Приложение с тестами.

## Окружение
- python 3.11
- node 16.16.0

# Запуск
## Всё приложение через Docker
```
docker-compose up
```
## Frontend
```
npm --legacy-peer-deps install
npm start
```
## Backend
### Установка через Docker
```
docker build --tag django_tests:latest .
docker run -p 8000:8000 django_tests
```

### Ручная установка
```
pip install -r requirements.txt
```
- Произвести миграции
```
python manage.py migrate
```
- Отредактировать файл .env
- Запуск сервера
```
python manage.py runserver
```