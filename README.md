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
### Для fe
### Для be

3. Запустить проект из корневой папки с помощью Docker Compose:
```
docker-compose up --build
```
Для очистки данных в базе:
```
docker-compose down -v
```
