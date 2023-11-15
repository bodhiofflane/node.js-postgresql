// Импортируем класс Client из библиотеки pg.
const {Client} = require('pg');

// Создаём экземпляр из импортированного класса.
const client = new Client({
  user: 'postgres',
  password: '231288',
  host: 'localhost',
  port: 5432,
  database: 'node_postgres'
});

// Экспортируем экземпляр с настройками.
module.exports = client;