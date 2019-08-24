const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
//const md5 = require("md5");
//const bcrypt = require("bcrypt");
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
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
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

app.get("/login", (req, res) => {
  res.render("login")
});

app.post("/login", (req, res) => {
  console.log("Please waite.. we are checking your credentials");
  dbhelper.loginUser(req.body.username, req.body.password, req, res, (err, user) => {
    if (err) {
      console.log("login failed: " + err);
      res.redirect("/login");
    } else {
      res.redirect("/secrets");
    }
  });
});
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

app.listen(3000, () => {
  console.log("Server started at port 3000.");
});
