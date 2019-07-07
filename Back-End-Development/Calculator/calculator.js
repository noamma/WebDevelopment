const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.listen(4500, function(){console.log("Server starts listening at: 4500");});
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});
app.get("/bmicalculator", function(req, res){
  res.sendFile(__dirname + "/bmicalculator.html");
});
app.post("/", function(req, res){
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  res.send(""+num1 + num2);
});
app.post("/bmicalculator", function(req, res){
  var weight = Number(req.body.weight);
  var height = Number(req.body.height);
  var n = (weight/(Math.pow(2, height)));
  res.send("Your bmi is: " + n);
})
