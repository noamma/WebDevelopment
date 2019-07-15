const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const ejs = require("ejs");
const app = express();

let items = [];
let workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", function(req, res){
  console.log("Today is: " + date.getDay());
  res.render('list', {listTitle: date.getDay(), items: items});
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
