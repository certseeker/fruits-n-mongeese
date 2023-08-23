// schema and model stuff goes here

const mongoose = require('mongoose');

// Schema is like the blueprint, or structure. This tells MongoseDB how the data will be stored

// as git is to github, mongose is to MongoDB. Mongoose iw hat connects my code to the datdbase, its like the middle man. Without it, it wont work. 

const fruitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  readyToEat: Boolean
})

// model adds all the methods to the schema that we can use to edit our data
//this add the actions from CRUD to the database
//we are creating a model, we are going to name the model fruit, and the schema we are going to attach to that model is called fruitSchema
const Fruit = mongoose.model('Fruit', fruitSchema);

//exproting to use in the server.js file 
module.exports = Fruit;