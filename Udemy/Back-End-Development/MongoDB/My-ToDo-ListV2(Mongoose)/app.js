const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
//const dbhelper = require(__dirname + "/js/dbHelper.js");
const list = require(__dirname + "/js/list.js");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
 //let listName = "";

app.get("/", function(req, res){
  res.render('list',{listObj: list.getList("default")});
});

app.get("/lists/:listname", function(req, res){
  res.render('list',{listObj: list.getList("default")});
});

app.post("/", function(req, res){
  console.log(req.body.listname);
  if (req.body.listname === "Today"){
    const item = new Item({name: req.body.item});
    item.save();
    res.redirect("/");
  }else {
    listName = req.body.listname;
    res.redirect("/" + listName);
  }
});

app.post("/delete", function(req, res){
  if(req.body && req.body.checkedItem.length > 0){
    const removedItemId = req.body.checkedItem;
    Item.findByIdAndRemove(removedItemId, function(err){
      if (err){
        console.log(err);
      }else{
        console.log("Successfuly removed item id: " + removedItemId);
      }
    });
  }
  res.redirect("/");
});



app.get("/about", function(req, res){
  res.render('about');
});
let port = process.PORT || 3000;
app.listen(port, function(){
  console.log("server started listenin on port: " + port);
});

/*
function renderList(ListName, callback(req, res)){
  res.render('list', {listTitle: ListName});
}
*/
