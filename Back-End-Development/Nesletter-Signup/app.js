const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.listen(4500, function(){
  console.log("Server starts listening on port 4500");
});
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});
