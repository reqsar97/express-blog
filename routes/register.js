const express = require('express');
const User = require('../models/user.js');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('auth/registration');
});

router.post('/', (req, res) => {
	console.log(req.body);
	const user = new User({
		id: Date.now(),
		username: req.body.username,
		password: req.body.password
	});
	user.save((err, user) => {
		if (err) {
			console.log(err);
		}
	});
	res.redirect(303, '/register');
});

module.exports = router;
