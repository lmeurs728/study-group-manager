const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const people = require("./people.js");
const validUser = people.valid;

// Scheme for classes
const classSchema = new mongoose.Schema({
	title: String,
	professor: String,
	students: Array,
  });
  
// New classSchema for classes in db
const Class = mongoose.model('Class', classSchema);

// Create Classes
router.post('', async (req, res) => {
	const _class = new Class({
		title: req.body.title,
		professor: req.body.professor,
		students: req.body.students
	});
	try {
	  await _class.save();
	  res.send(_class);
	} catch (error) {
	  console.log(error);
	  res.sendStatus(500);
	}
  });



// Get All Classes
router.get('', async (req, res) => {
	try {
	  let _class = await Class.find();
	  res.send(_class);
	} catch (error) {
	  console.log(error);
	  res.sendStatus(500);
	}
  });


// Get Specific Class
router.get('/:id', validUser, async (req, res) => {
	try {
	  let _class = await Class.findOne({
		_id: req.params.id
	});
	  res.send(_class);
	} catch (error) {
	  console.log(error);
	  res.sendStatus(500);
	}
  });



//Delete Specific Class
router.delete('/:id', validUser, async (req, res) => {
	try {
	  await Class.deleteOne({
		_id: req.params.id
	  });
	  res.sendStatus(200);
	} catch (error) {
	  console.log(error);
	  res.sendStatus(500);
	}
  });


//Edit Specific Class
router.put('/:id', validUser, async (req, res) => {
	try {
	let _class = await Class.findOne({
		_id: req.params.id
	});

	_class.title = req.body.title || _class.title
	_class.professor = req.body.professor || _class.professor
	_class.students = req.body.students || _class.students

	  await _class.save();
	  res.sendStatus(200);
	} catch (error) {
	  console.log(error);
	  res.sendStatus(500);
	}
  });

module.exports = {
	routes: router,
}