const bodyParser = require("body-parser");
const express = require("express");
const articles = require(__dirname + "/js/articles.js");
const ejs = require("ejs");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get("/",(req, res)=>{res.send("Wiki-API !");});

app.route("/articles").get((req, res)=>{
  articles.getArticles((articles)=>{
    //console.log(articles);
    res.send(articles);
  });
}).post((req, res)=>{
  if (req.body.title && req.body.content){
    let title = req.body.title;
    let content = req.body.content;

    articles.addArticle(title, content, (result)=>{
      if(result){
        console.log(result.title);
        console.log(result.content);
        res.send("<h1>Your article was successfuly submitted</h1><br><br>" + result.title + "<br><br>" + result.content );
      }
    });
  }else {
    res.send("oh No !  api return missing params error !");
  }
}).delete((req, res)=>{

    articles.deleteArticles((result)=>{
      if(result){
        res.send("<h1>successfuly deleted All Articles</h1>");
      }else {
        res.send("oh No !  api return missing params error !");
      }
    });
});

app.listen(3000,()=>{
  console.log("Server started at port 3000");
});
