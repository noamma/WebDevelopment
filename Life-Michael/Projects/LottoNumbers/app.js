//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.route("/settings").get((req, res) => {
  res.sendFile(__dirname + "/settings.html");
});

app.listen(80, () => {
  console.log("Server successfuly started at port 80");
});
