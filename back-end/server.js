/*
Back-End: Server.js
ToDo:
	-Define Data structure for personScheme
	-Full_name or name?
	-import axios
	-Multiple documents? Do we need to make availability objects/ Add Id to availability? Not sure.
	-Upload photo functionality?
	-https://stackoverflow.com/questions/42019679/object-type-in-mongoose
*/
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));



// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const mongoose = require('mongoose');

//Connect to study-group db 
mongoose.connect('mongodb://localhost:27017/study-group', {
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// import the users module and setup its API path
const people = require("./people.js");
app.use("/api/people", people.routes);

const classes = require("./classes.js");
app.use("/api/classes", classes.routes);

app.listen(3003, () => console.log('Server listening on port 3003!'));
