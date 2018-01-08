const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	console.log(req.user);
	res.send('all posts');
});

router.get('/me', (req, res) => {
	res.send('usser posts');
});

router.get('/create', (req, res) => {
	res.send('create post');
});

router.post('/', (req, res) => {
	res.send('create');
});

router.get('/:id', (req, res) => {
	res.send('get post by id: ' + req.params.id);
});

router.get('/:id/edit', (req, res) => {
	res.send('edit post by id: ' + req.params.id);
});

router.put('/:id', (req, res) => {
	res.send('update post');
});

router.delete('/:id', (req, res) => {
	res.send('delete post');
});

router.get('/category/:id', (req, res) => {
	res.send('get all post by category id: ' + req.params.id);
});

module.exports = router;
