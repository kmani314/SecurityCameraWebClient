const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const session = require('express-session');
const crypto = require('crypto');
const ejs = require('ejs');
const path = require('path');
const app = express();

mongoose.connect('mongodb://127.0.0.1/webcc', { useNewUrlParser: true });
var db = mongoose.connection;

const port = 8080;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("DB Opened");
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public'));

app.use(session({
  secret: crypto.randomBytes(64).toString('hex'),
  resave: true,
  saveUnitialized: false,
}));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
