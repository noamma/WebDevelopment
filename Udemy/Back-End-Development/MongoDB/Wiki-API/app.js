const bodyParser = require("body-parser");
const express = require("express");
const articles = require(__dirname + "/js/articles.js");
const ejs = require("ejs");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get("/",(req, res)=>{res.send("Wiki-API !");});

app.get("/articles", (req, res)=>{
  articles.getArticles((articles)=>{
    //console.log(articles);
    res.send(articles);
  });
  //res.send();
});

app.listen(3000,()=>{
  console.log("Server started at port 3000");
});
