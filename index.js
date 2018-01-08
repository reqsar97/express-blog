const express = require('express');
const handlebars = require('express-handlebars')
	.create({defaultLayout: 'main'});
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const authMiddleware = require('connect-ensure-login');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

const credentials = require('./credentials.js');
const emailService = require('./lib/email.js')(credentials);
const postsRoutes = require('./routes/posts.js');
const categoriesRoutes = require('./routes/category.js');
const loginRoutes = require('./routes/login.js');
const regiserRoutes = require('./routes/register.js');

const app = new express();

// Start mongodb

const opts = {
	server: {
		socketOptions: {keepAlive: 1}
	}
};
mongoose.connect(credentials.mongo.development.connectionString, opts, err => {
	if (err) {
		console.log(err);
	}
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride((req, res) => {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // Look in urlencoded POST bodies and delete it
		const method = req.body._method;
		delete req.body._method;
		return method;
	}
}));

app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
	resave: false,
	saveUninitialized: false,
	secret: credentials.cookieSecret
}));
// Passport auth
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, cb) => {
	User.find({username}, (err, user) => {
		user = user[0];
		if (err) {
			console.log(err);
			return cb(err);
		}
		if (!user) {
			console.log('!user');
			return cb(null, false);
		}
		if (user.password != password) {
			console.log(user);
			console.log(user.password + ' != ' + password);
			return cb(null, false);
		}
		return cb(null, user);
	});
}));
passport.serializeUser((user, cb) => {
	cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
	User.find({id}, (err, user) => {
		if (err) {
			console.log(err);
			return cb(err);
		}
		cb(null, user);
	});
});

// App.use(require('csurf')());

// app.use((req, res, next) => {
// 	res.locals._csrfToken = req.csrfToken();
// 	next();
// });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
	res.locals.flash = req.session.flash;
	res.locals.username = 'Karen';
	delete req.session.flash;
	next();
});
// Use routes
app.use('/posts', postsRoutes);
app.use('/category', categoriesRoutes);
app.use('/login', authMiddleware.ensureLoggedOut(), loginRoutes);

app.use('/register', authMiddleware.ensureLoggedIn(), regiserRoutes);

app.get('/logout', authMiddleware.ensureLoggedIn(), (req, res) => {
	res.send('logout');
});

app.get('/sendMail', (req, res) => {
	const cart = {};

	cart.billing = {
		name: 'Karen',
		email: 'karen.tumanyan97@gmail.com'
	};

	res.render('emails/cart-thank-you',
			{layout: null, cart},
			(err, html) => {
				if (err) {
					console.log('template error');
				}
				emailService.send('joecustomer@gmail.com',
					'cool bro :D!',
					html);
			}
	);

	res.send('mail send');
});

app.get('/', (req, res) => {
	let user;
	if (req.user) {
		user = req.user[0];
	}
	res.render('home');
});

app.listen(app.get('port'), () => {
	console.log('Express запущен на http://localhost:' +
app.get('port') + '; нажмите Ctrl+C для завершения.');
});
