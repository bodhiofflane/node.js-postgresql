const { Router } = require('express');
const postController = require('../controllers/post.controller');

const router = Router();

router.post('/post', postController.createPost);
router.get('/post', postController.getPostByUser);

module.exports = router;