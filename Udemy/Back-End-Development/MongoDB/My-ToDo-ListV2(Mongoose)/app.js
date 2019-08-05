const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

let items = [];
let workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true});

const itemsSchema = {
  name: {
    type: String,
    required: true
  }
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Example item 1"
});

const item2 = new Item({
  name: "Example item 2"
});

const item3 = new Item({
  name: "Example item 3"
});

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems, function(err){
  if (err){
    console.log(err);
  }else{
    console.log("Successfuly insert items");
  }
});

app.get("/", function(req, res){

  res.render('list', {listTitle: "Today", items: items});
});

app.get("/work", function(req, res){
  res.render('list', {listTitle: "Work List", items: workItems});
});

app.post("/", function(req, res){
  console.log(req.body.list);
  if (req.body.list === "Work"){
    workItems.push(req.body.item);
    res.redirect("/work");
  }else {
    items.push(req.body.item);
    res.redirect("/");
  }
});

app.get("/about", function(req, res){
  res.render('about');
});
let port = process.PORT || 3000;
app.listen(port, function(){
  console.log("server started listenin on port: " + port);
});
