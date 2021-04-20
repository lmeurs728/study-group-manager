const mongoose = require('mongoose');
const express = require("express");
const argon2 = require("argon2");

const router = express.Router();

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

//Scheme for people
const personSchema = new mongoose.Schema({
	name: String,
	phone: String,
	email: String,
	avatar: String,
	availability: {
		Sunday: Array,
		Monday: Array,
		Tuesday: Array,
		Wednesday: Array,
		Thursday: Array,
		Friday: Array,
		Saturday: Array,
	},
	username: String,
	password: String,
	role: {
		type: String,
		default: ""
	}
  });

  // This is a hook that will be called before a user record is saved,
// allowing us to be sure to salt and hash the password first.
personSchema.pre('save', async function(next) {
	// only hash the password if it has been modified (or is new)
	if (!this.isModified('password'))
	  return next();
  
	try {
	  // generate a hash. argon2 does the salting and hashing for us
	  const hash = await argon2.hash(this.password);
	  // override the plaintext password with the hashed one
	  this.password = hash;
	  next();
	} catch (error) {
	  console.log(error);
	  next(error);
	}
  });
  
  // This is a method that we can call on User objects to compare the hash of the
  // password the browser sends with the has of the user's true password stored in
  // the database.
  personSchema.methods.comparePassword = async function(password) {
	try {
	  // note that we supply the hash stored in the database (first argument) and
	  // the plaintext password. argon2 will do the hashing and salting and
	  // comparison for us.
	  const isMatch = await argon2.verify(this.password, password);
	  return isMatch;
	} catch (error) {
	  return false;
	}
  };
  
  // This is a method that will be called automatically any time we convert a user
  // object to JSON. It deletes the password hash from the object. This ensures
  // that we never send password hashes over our API, to avoid giving away
  // anything to an attacker.
  personSchema.methods.toJSON = function() {
	var obj = this.toObject();
	delete obj.password;
	return obj;
  }
  
// New personScheme for people in db
const Person = mongoose.model('Person', personSchema);

/* Middleware */

// middleware function to check for logged-in users
const validUser = async (req, res, next) => {
	if (!req.session.userID)
	  return res.status(403).send({
		message: "not logged in"
	  });
	try {
	  const user = await Person.findOne({
		_id: req.session.userID
	  });
	  if (!user) {
		return res.status(403).send({
		  message: "not logged in"
		});
	  }
	  // set the user field in the request
	  req.user = user;
	} catch (error) {
	  // Return an error if user does not exist.
	  return res.status(403).send({
		message: "not logged in"
	  });
	}
  
	// if everything succeeds, move to the next middleware
	next();
  };

// Create Person
router.post('', async (req, res) => {
	if (!req.body.name || !req.body.username || !req.body.password || !req.body.email) {
		return res.status(400).send({
			message: "name, username, and password are required"
		});
	}
	
	try {
		const existingUser = await Person.findOne({
			username: req.body.username
		  });
		if (existingUser) {
			return res.status(403).send({
				message: "username already exists"
			});
		}

		const person = new Person({
			username: req.body.username,
			password: req.body.password,
			name: req.body.name,
			phone: req.body.phone,
			email: req.body.email,
			avatar: req.body.avatar,
			availability: req.body.availability,
		});

	  await person.save();
	  req.session.userID = person._id;
	  res.send({user: person});
	} catch (error) {
	  console.log(error);
	  res.sendStatus(500);
	}
  });



// Get All Persons
router.get('/find', async (req, res) => {
	try {
	  let people = await Person.find();
	  res.send(people);
	} catch (error) {
	  console.log(error);
	  res.sendStatus(500);
	}
  });

// Get Specific Person
router.get('/find/:id', async (req, res) => {
	try {
	  const person = await Person.findOne({
		_id: req.params.id
	});
	  res.send({user: person});
	} catch (error) {
	  console.log(error);
	  res.sendStatus(500);
	}
  });



//Delete Specific Person
router.delete('/:id', async (req, res) => {
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
  router.put('/:id', async (req, res) => {
	try {
	let person = await Person.findOne({
		_id: req.params.id
	});

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

  // login a user
router.post('/login', async (req, res) => {
	// Make sure that the form coming from the browser includes a username and a
	// password, otherwise return an error.
	if (!req.body.username || !req.body.password)
	  return res.sendStatus(400);
  
	try {
	  //  lookup user record
	  const person = await Person.findOne({
		username: req.body.username
	  });
	  // Return an error if user does not exist.
	  if (!person)
		return res.status(403).send({
		  message: "username or password is wrong"
		});
  
	  // Return the SAME error if the password is wrong. This ensure we don't
	  // leak any information about which users exist.
	  if (!await person.comparePassword(req.body.password))
		return res.status(403).send({
		  message: "username or password is wrong"
		});
  
	  // set user session info
	  req.session.userID = person._id;
  
	  res.send({user: person});
  
	} catch (error) {
	  console.log(error);
	  return res.sendStatus(500);
	}
  });

// get logged in user
router.get('/', validUser, async (req, res) => {
	try {
	  res.send({user: req.user});
	} catch (error) {
	  console.log(error);
	  return res.sendStatus(500);
	}
  });

  // logout
router.delete("/", validUser, async (req, res) => {
	try {
	  req.session = null;
	  res.sendStatus(200);
	} catch (error) {
	  console.log(error);
	  return res.sendStatus(500);
	}
  });

  // logout
router.get("/loggedIn", async (req, res) => {
	try {
	  if (req.session.userID) {
		res.send({truth: true});
	  }
	  else {
		res.send({truth: false});
	  }
	  //res.sendStatus(200);
	} catch (error) {
	  console.log(error);
	  return res.sendStatus(500);
	}
  });

module.exports = {
	model: Person,
	routes: router,
	valid: validUser
}