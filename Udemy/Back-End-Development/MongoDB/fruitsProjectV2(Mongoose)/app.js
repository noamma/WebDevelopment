const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});
//mongoose.connect("mongodb://localhost:27017/personsDB", {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 10},
  review: String
});

const Fruit = new mongoose.model("Fruit", fruitSchema);

const apple = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit"
});

const banana = new Fruit({
  name: "Banana",
  rating: 8,
  review: "Boomelishese!"
});

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "Kiwi is the shit!!"
});

const peach = new Fruit({
  name: "Peach",
  rating: 10,
  review: "Peaches are fruitilishese !"
});

const pineapple = new Fruit({
  name: "Pineapple",
  rating: 9,
  review: "Pineapples are superem!"
});

const orange = new Fruit({
  name: "Orange",
  rating: 8,
  review: "Golden apple!"
});

/*
Fruit.insertMany([apple, banana, kiwi, peach, pineapple], function(err){
  if (err){
    console.log(err);
  }else{
    console.log("Successfuly inserted fruits!");
  }
});
*/
/*
const fruit = new Fruit ({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

*/

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = new mongoose.model("Person", personSchema);
/*
Person.deleteMany({name: "Jhone"}, function(err){
  if (err){
    console.log(err);
  }else{
    console.log("Successfuly batch delete all documents containing name: Jhone");
  }
});*/

const person = new Person({
  name: "Amy",
  age: 12,
  favouriteFruit: pineapple
});

orange.save();

Person.updateOne({name: "Jhon"}, {favouriteFruit: orange}, function(err){
  if (err){
    console.log(err);
  }else{
    console.log("Successfuly updated favouriteFruit");
  }
});
//person.save();
/*
Fruit.deleteOne({_id: "5d483da65b611d0a78a7edf6"}, function(err){
  if (err){
    console.log(err);
  }else{
    console.log("Successfuly deleted document id: 5d483da65b611d0a78a7edf6");
  }
});
Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  }else{
    fruits.forEach(function(fruit){
        console.log(fruit.name);
      });
      mongoose.connection.close();
  }
});
*/
