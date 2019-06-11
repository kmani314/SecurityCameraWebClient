const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/routes.js');

mongoose.connect('mongodb://127.0.0.1/webcc', { useNewUrlParser: true });
var db = mongoose.connection;

const port = 8080;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("DB Opened");
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
