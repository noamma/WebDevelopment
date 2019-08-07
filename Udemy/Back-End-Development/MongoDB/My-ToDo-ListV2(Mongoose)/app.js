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
  let listDoc = list.getList("Today");
  //console.log(listDoc);
  setTimeout(function(){res.render('list',{listObj: listDoc});}, 1000);
  //res.redirect("/");
});

app.get("/lists/:listname", function(req, res){
let _list = list.getList(req.params.listname);
  setTimeout(function(){res.render('list',{listObj: _list});}, 1000);
});

app.post("/", function(req, res){
  console.log(req.body.listname);
  if (req.body.listname === "Today"){
    const item = new Item({name: req.body.item});
    item.save();
    res.redirect("/");
  }else {
    listName = req.body.listname;
    setTimeout(function(){res.redirect("/lists/"+req.params.listname)}, 500);
  }
});

app.post("/delete", function(req, res){
  if(req.body && req.body.checkedItem.length > 0){
    const removedItemId = req.body.checkedItem;
    const listName = req.body.listName;
    console.log("Item id: " + removedItemId);
    console.log("was marked for deletion");
    console.log("Originated from list: " + listName);
    list.deleteItem(listName, removedItemId);
    setTimeout(function(){res.redirect("/lists/"+req.params.listname)}, 500);
  }

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
