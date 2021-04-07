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

//Scheme for people
const personSchema = new mongoose.Schema({
	name: String,
	phone: String,
	email: String,
	avatar: String,
	availability: {
		Monday: Array,
		Tuesday: Array,
		Wednesday: Array,
		Thursday: Array,
		Friday: Array,
		Saturday: Array,
		Sunday: Array,
	}
  });
  
// New personScheme for people in db
const Person = mongoose.model('Person', personSchema);


// Save image and return "avatar : {path}"
app.post('/api/photos', upload.single('photo'), async (req, res) => {
	// Just a safety check
	if (!req.file) {
	  return res.sendStatus(400);
	}
	res.send({
	  avatar: "/images/" + req.file.filename
	});
  });


// Create Person
app.post('/api/people', async (req, res) => {
	const person = new Person({
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		availability: req.body.availability,
	});
	try {
	  await person.save();
	  res.send(person);
	} catch (error) {
	  console.log(error);
	  res.sendStatus(500);
	}
  });



// Get All Persons
app.get('/api/people', async (req, res) => {
	try {
	  let people = await Person.find();
	  res.send(people);
	} catch (error) {
	  console.log(error);
	  res.sendStatus(500);
	}
  });

app.get('/api/people/test', async (req, res) => {
	try {
		console.log("It worked");
	} catch (error) {
	  	console.log(error);
	  	res.sendStatus(500);
	}
  });

// Get Specific Person
app.get('/api/people/:id', async (req, res) => {
	try {
	  let person = await Person.findOne({
		_id: req.params.id
	});
	  res.send(person);
	} catch (error) {
	  console.log(error);
	  res.sendStatus(500);
	}
  });



//Delete Specific Person
  app.delete('/api/people/:id', async (req, res) => {
	try {
	  await Person.deleteOne({
		_id: req.params.id
	  });
	  res.sendStatus(200);
	} catch (error) {
	  console.log(error);
	  res.sendStatus(500);
	}
  });


//Edit Specific Person
  app.put('/api/people/:id', async (req, res) => {
	try {
	let person = await Person.findOne({
		_id: req.params.id
	});

	person.title = req.body.title || person.title
	person.description = req.body.description || person.description
	person.name = req.body.name || person.name;
	person.phone = req.body.phone || person.phone;
	person.email = req.body.email || person.email;
	person.avatar = req.body.avatar || person.avatar;
	person.availability = req.body.availability || person.availability;

	  await person.save();
	  res.sendStatus(200);
	} catch (error) {
	  console.log(error);
	  res.sendStatus(500);
	}
  });

app.listen(3000, () => console.log('Server listening on port 3000!'));




// curl -X POST -d '{"name": "", "phone": "", "email": "", "avatar": "", "availability": {"Monday": "[]", "Tuesday": "[]", "Wednesday": "[]", "Thursday": "[]", "Friday": "[]", "Saturday": "[]", "Sunday": "[]"}}' -H "Content-Type: application/json" localhost:3000/api/study-group

