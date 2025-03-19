# Web калькулятор

### Технологии:
- **TypeScript**
- **Node.js** 
- **Express.js**
- **Axios** 
- **MongoDB**
- **JWT**
## Установка

Для того, чтобы запустить проект, нужно:

1. Клонировать репозиторий:
```
git clone https://github.com/nipoks/calculator.git
cd ./calculator
```
2. Установить зависимости для всех сервисов:

```
cd ./fe
npm install
make env 
cd ..

cd ./be
npm install
make env
```
### Необходимо задать значения переменных в env файлах
### Для ./fe и ./be

3. Запустить проект из корневой папки с помощью Docker Compose:
```
docker-compose up --build
```
Для очистки данных в базе:
```
docker-compose down -v
```
4. Пользователи:
```
email: first@example.com, password: 12 

email: second@example.com, password: 13
```
5. Приложение:

### Фронт по адресу: http://localhost:80/
### UI Mongo: http://localhost:8081/

## Возможные направления для улучшения 

- Отделение логики обработчиков от логики работы с моделями и бд
- Выделение интерфейса для работы с бд
- Ввести документирование API (swagger)
- Хранение refreshToken пользователей в бд
- Разбиение крупного общего компанента Calculator
- Валидация данных на страницах Login/Register
- Введение проверок синтаксиса и автозамену
