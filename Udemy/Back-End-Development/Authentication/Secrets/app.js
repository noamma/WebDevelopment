const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.route("/").get((req, res)=>{res.render("home")});

app.get("/register", (req, res)=>{res.render("register")});

app.get("/login", (req, res)=>{res.render("login")});

app.listen(3000, ()=>{
  console.log("Server started at port 3000.");
});
