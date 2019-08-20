const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const md5 = require("md5");
const dbhelper = require(__dirname + "/js/dbhelper.js");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.route("/").get((req, res)=>{res.render("home")});

app.get("/register", (req, res)=>{res.render("register")});

app.post("/register",(req, res)=>{
  let username = req.body.username;
  let password = md5(req.body.password);

  dbhelper.createNewUser(username, password,(result)=>{
    if(result){
      console.log("Successfuly registerd new user");
      console.log("User Name: " + result.email);
      console.log("Password: *******");
      res.render("secrets");
    }
  });
});

app.get("/login", (req, res)=>{res.render("login")});

app.post("/login", (req, res)=>{
  const _username = req.body.username;
  const _password = md5(req.body.password);

  console.log("Please waite.. we are checking your credentials");
  dbhelper.validateCredentials(_username, _password, (result)=>{
    if(result){
      if (result === "reject"){
        res.send("Login failed: bad Password");
      }else{
          res.render("secrets");
      }
    }else{
      res.send("Login failed: No such User!");
    }
  });
});

app.listen(3000, ()=>{
  console.log("Server started at port 3000.");
});
