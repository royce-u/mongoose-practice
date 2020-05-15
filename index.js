// TODO: Require needed node modules
const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')

// Declare an app variable
const app = express();

// Set the view engine
app.set('view engine', 'ejs');

// TODO: Middleware, etc
app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

// Declare controllers
app.use('/museums', require('./controllers/museums'));
app.use('/pieces', require('./controllers/pieces'));

// Make home route
app.get('/', (req, res) => {
  res.render('home');
});

// TODO: Listen
app.listen(3000);

