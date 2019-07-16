const express = require("express");
const app = express();

app.get("/", function(req, res){
  res.send("<h1>Hello, Express World</h1>");
});
app.get("/contact", function(req, res){
  res.send("<span><h3>Contact me at: </h3><a href='mailto:noamma@markodt.com'>NoamMa@MarkoDT.com</a></span>");
});
app.get("/about", function(req, res){
  res.send("<h1>This is my about page !<h1>");
});
app.listen(4500, function(){
    console.log("Server start listening on port: 4500");
});
