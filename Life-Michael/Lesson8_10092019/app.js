const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}), express.static('public'));
app.get("/",(req, res)=>{
  //res.send("Welcome to my server")});
  res.sendFile(__dirname+"/public/domdemo.html");
});
app.get("/eventscalc",(req, res)=>{
  res.sendFile(__dirname+"/public/eventscalc.html");
});
app.listen(80, ()=>{
  console.log("server started at port 80");
});
