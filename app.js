const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true})); // New

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json()); // New

// Static Files
app.use(express.static('public'));

// Templating Engine
app.engine('hbs', exphbs( {extname: '.hbs' }));
app.set('view engine', 'hbs'); 

const routes = require('./server/routes/admin');
app.use('/admin', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));