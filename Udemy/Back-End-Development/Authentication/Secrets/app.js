//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const dbhelper = require(__dirname + "/js/dbhelper.js");

const saltRounds = 10;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "test secret string.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.route("/").get((req, res) => {
  res.render("home")
});

app.get("/register", (req, res) => {
  res.render("register")
});

app.get("/secrets", (req, res) => {
  dbhelper.getSecrets((err, usersWithSecrets)=>{
    if(err){
      console.log("db returned with error: "+err);
    }else if (usersWithSecrets){
      res.render("secrets", {usersWithSecrets});
    }
  });
});

app.route("/submit").get((req, res)=>{
  if (req.isAuthenticated()) {
    res.render("submit");
  } else {
    res.redirect("/login");
  }
}).post((req, res)=>{
  dbhelper.postSecret(req, (err, secret)=>{
    if(err){
      console.log(err);
    }else{
      console.log("Successfuly submitted your secret: " + secret);
      res.redirect("/secrets");
    }
  });
});

app.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  console.log("User name: " + username);
  console.log("Password: " + password.length);
  dbhelper.registerUser(username, password, (err, result) => {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      });
    }
  });
});

app.route("/login").get((req, res) => {
  res.render("login");
}).post((req, res) => {
  console.log("Please waite.. we are checking your credentials");
  dbhelper.loginUser(req, res, (err, user)=>{
    if (err) {
      console.log("login failed: " + err);
      res.redirect("/login");
    } else {
      passport.authenticate("local")(req, res, ()=>{res.redirect("/secrets");});
    }
  });
});

app.listen(80, () => {
  console.log("Server started at port 80.");
});


//const md5 = require("md5");
//const bcrypt = require("bcrypt");
//const _password = md5(req.body.password);
// dbhelper.validateCredentials(_username, req.body.password, (result)=>{
//   if(result){
//     if (result === "reject"){
//       res.send("Login failed: bad Password");
//     }else{
//         res.render("secrets");
//     }
//   }else{
//     res.send("Login failed: No such User!");
//   }
// });

//  let password = md5(req.body.password);
// bcrypt.hash(req.body.password, saltRounds, (err, hash)=>{
//   if(err){
//     console.log(err);
//   }else{
//     dbhelper.createNewUser(username, hash,(result)=>{
//       if(result){
//         console.log("Successfuly registerd new user");
//         console.log("User Name: " + result.email);
//         console.log("Password: *******");
//         res.redirect("/secrets");
//       }
//     });
//   }
// });
