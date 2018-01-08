const express = require('express');

const router = express.Router();

router.get('/me', (req, res) => {
	res.send('user categories');
});

router.get('/me/create', (req, res) => {
	res.send('create category');
});

router.post('/', (req, res) => {
	res.send('create');
});

router.delete('/:id', (req, res) => {
	res.send('delete');
});

router.get('/me/:id/edit', (req, res) => {
	res.send('edit category by id');
});

router.put('/me/:id', (req, res) => {
	res.send('update category');
});

module.exports = router;
