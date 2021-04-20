const reader = require("readline-sync");
const mongoose = require('mongoose');
const persons = require("./people.js");

const Person = persons.model;

// connect to Mongo
mongoose.connect('mongodb://localhost:27017/study-group', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});


// get the needed info
let name = reader.question("Name: ");
let username = reader.question("Username: ");
const password = reader.question("Password: ", {
  hideEchoBack: true
});

if (name === "" || username === "" || password === "") {
  console.log("You need to enter a name, username, and password");
  process.exit();
}

Person.findOne({
  username: username
}).then((person) => {
  if (person) {
    console.log("That username already exists");
    process.exit();
  }
}).then(() => {
  let person = new Person({
    name: name,
    username: username,
    password: password,
    role: "admin"
  });
  person.save().then(() => {
    console.log("OK, admin user created for", name, "with username", username);
    process.exit();
  });
}).catch(error => {
  console.log(error);
});