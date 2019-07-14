const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.get("/", function(req, res){
  res.render('list', {foo: 'FOO'});
});
var port = process.PORT || 3000;
app.listen(port, function(){
  console.log("server started listenin on port: " + port);
});
