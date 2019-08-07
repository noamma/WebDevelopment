const dbhelper = require(__dirname + "/dbHelper.js");
dbhelper.connect();
var listDoc;
exports.getList = function(_list, _callback){
    dbhelper.List.findOne({name: _list}, function(err, list){
      if (err){
        console.log(err);
      }else{
        if (list && list.name.length>0){
          console.log("found list: " + list.name);
          listDoc = list;
          //console.log("Successfuly retrieved list: " + listDoc);
          //return list;
        }else{
          console.log("Creating list...");
          listDoc = dbhelper.newList(_list);
          console.log("Successfuly created list: " + listDoc.name);
        }
        }
    });
  //  console.log("returning list: " + listDoc);
    _callback(listDoc);
  };

exports.deleteItem = function(listName, itemId){
    dbhelper.removeListItem(listName, itemId);
}
//res.render('list', {listTitle: result.name, items: result.items});
/*
const list = new List({
  name: listName,
  items: defaultItems
});
list.save();
res.redirect("/"+listName);
*/
