const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('auth/login');
});

router.post('/', (req, res, next) => {
	console.log(123);
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			console.log(err);
			return next(err);
		}
		if (!user) {
			console.log(info);
			console.log(12345);
			return res.redirect('/login');
		}
		req.logIn(user, err => {
			if (err) {
				console.log(err);
				return next(err);
			}
			return res.redirect('/');
		});
	})(req, res, next);
});

module.exports = router;
