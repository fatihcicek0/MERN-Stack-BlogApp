const express = require('express');
const router = express.Router();

const postControllers = require('../controllers/post');
const { jwtVerify } = require('../middleware/jwtVerify');

router.get('/posts', postControllers.getPosts);

router.post('/post', jwtVerify, postControllers.addPost);

router.put('/post', jwtVerify, postControllers.updatePost);

router.delete('/post/:postId', jwtVerify, postControllers.deletePost);

router.get('/post/:postId', postControllers.getPostById);

router.get('/post/user/:userId', jwtVerify, postControllers.getPostsByUserId);

router.get('/categories/:categoryId', postControllers.getPostsByCategoryId);

router.post('/comment', jwtVerify, postControllers.addComment);

router.get('/categories', postControllers.getCategories);

router.post('/category', postControllers.addCategory);

module.exports = router;