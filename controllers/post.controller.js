const client = require('../db');

class PostController {
  async createPost(req, res) {
    // У поста есть еще id пользователя.
    const {title, content, userId} = req.body;

    await client.connect();

    const newPost = await client.query(
      'INSERT INTO post(title, content, user_id) VALUES($1, $2, $3) RETURNING *',
      [title, content, userId]
    );

    await client.end();

    res.json(newPost.rows[0]);
  }
  
  async getPostByUser(req, res) {
    // Здесь не часть строки запроса, а отдельный query-параметр после ? в URL.
    const id = req.query.id;

    await client.connect();

    const posts = await client.query(
      'SELECT * FROM post WHERE user_id = $1',
      [id]
    );

    await client.end();

    res.json(posts.rows);
  }
}

module.exports = new PostController();