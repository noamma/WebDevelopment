const dbhelper = require(__dirname + "/dbHelper.js");
dbhelper.connect();
var articleDoc;

exports.getArticles = (_callback)=>{
  dbhelper.getAllArticles((articles)=>{
      _callback(articles);
  });
};
exports.getList = function(_list, _callback){
  dbhelper.List.findOne({name: _list}, function(err, list){
    if (err){
      console.log(err);
    }else{
      if (list && list.name.length>0){
        console.log("found list: " + list.name);
        listDoc = list;
        console.log("Successfuly retrieved list: " + listDoc.name);
        _callback(listDoc);
        //return list;
      }else{
        console.log("Creating list...");
        listDoc = dbhelper.newList(_list);
        console.log("Successfuly created list: " + listDoc.name);
        _callback(listDoc);
      }

      }
  });
  // console.log("New / Updated list loaded:");
  // console.log(listDoc);
  // _callback(listDoc);
  };

exports.deleteItem = function(listName, itemId, _callback){
    dbhelper.removeListItem(listName, itemId, function(_list){
    _callback(_list);
    });
}

exports.addItem = function(listName, itemName,_callback){
  dbhelper.addListItem(listName, itemName, function(_list){
    _callback(_list);
  });
};
//res.render('list', {listTitle: result.name, items: result.items});
/*
const list = new List({
  name: listName,
  items: defaultItems
});
list.save();
res.redirect("/"+listName);
*/
