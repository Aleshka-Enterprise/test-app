# test-app
Приложение с тестами.

## Окружение
- python 3.11
- node 16.16.0

# Запуск
## Frontend
```
npm --legacy-peer-deps install
npm start
```
## Backend
### Установка
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