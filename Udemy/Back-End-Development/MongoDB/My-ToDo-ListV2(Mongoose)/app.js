const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
//const dbhelper = require(__dirname + "/js/dbHelper.js");
const list = require(__dirname + "/js/list.js");
const _ = require("lodash");
const app = express();
let liststring;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
 //let listName = "";

app.get("/", function(req, res){
  list.getList("Today", function(_listDoc){
    console.log("render was triggerd");
    res.render('list',{listObj: _listDoc})});
});

app.get("/lists/:listname", function(req, res){
liststring = _.capitalize(req.params.listname);
list.getList(liststring, function(_list){
  res.render('list',{listObj: _list});
});
});

app.post("/", function(req, res){
  listName = req.body.listname;
  itemName = req.body.item;
  console.log("POST request recieved from list: " + listName);
  console.log("to push new item: " + itemName + " to the list");
  list.addItem(listName,itemName,()=>{
    if (listName === "Today"){
      // const item = new Item({name: req.body.item});
      // item.save();
      res.redirect("/");
    }else {
      res.redirect("/lists/"+listName);
    }
  });
});

app.post("/delete", function(req, res){
  if(req.body && req.body.checkedItem.length > 0){
    const removedItemId = req.body.checkedItem;
    const listName = req.body.listName;
    console.log("Item id: " + removedItemId);
    console.log("was marked for deletion");
    console.log("Originated from list: " + listName);
    list.deleteItem(listName, removedItemId, function(_listname){
      if(_listname === "Today"){
        res.redirect("/");
      }else{
          //console.log("getting back from callback after 5 sec delay..");
          console.log("triggring redirect...");
          res.redirect("/lists/"+_listname);
      }
    });
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
