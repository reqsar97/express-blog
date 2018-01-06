const express = require('express');
const handlebars = require('express-handlebars')
	.create({defaultLayout: 'main'});

const app = new express();

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/login', (req, res) => {
  res.render('auth/login');
});

app.get('/register', (req, res) => {
  res.render('auth/registration');
});



app.listen(app.get('port'), () => {
	console.log('Express запущен на http://localhost:' +
app.get('port') + '; нажмите Ctrl+C для завершения.');
});
