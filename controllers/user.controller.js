// Импортируем настройенный экземпляр пул в контроллер пользователя.
const client = require('../db');

// Полный CRUD-цикл.
class UserController {
  async createUser(req, res) {
    const { name, surname } = req.body;

    await client.connect();

    const newPerson = await client.query(
      'INSERT INTO person(name, surname) VALUES ($1, $2) RETURNING *',
      [name, surname]
    );

    await client.end();

    // При создании одного поля вернется лишь одна запись.
    res.json(newPerson.rows[0]);
  }

  async getUsers(req, res) {
    await client.connect();

    const users = await client.query('SELECT * FROM person');

    await client.end();
    
    // При получении массива знаечний отсылаем весь массив а не его нулевой индекс.
    res.json(users.rows);
  }

  async getOneUser(req, res) {
    const params = req.params.id;

    await client.connect();

    const user = await client.query('SELECT * FROM person WHERE id = $1', [params]);

    await client.end();

    // Здесь так же отсылаем объект из массива
    res.json(user.rows[0]);
  }

  async updateUser(req, res) {
    const {id, name, surname} = req.body;

    await client.connect();

    const user = await client.query(
      'UPDATE person SET name = $1, surname = $2 WHERE id = $3 RETURNING *',
      [name, surname, id]
    );

    await client.end();

    // Возвращаем объект а не массив с объектом.
    res.json(user.rows[0]);
  }
  
  async deleteUser(req, res) {
    const id = req.params.id;

    await client.connect();

    const user = await client.query(
      'DELETE FROM person WHERE id = $1 RETURNING *',
      [id],
    );

    await client.end();

    res.json(user.rows[0]);
  }
}

module.exports = new UserController();
