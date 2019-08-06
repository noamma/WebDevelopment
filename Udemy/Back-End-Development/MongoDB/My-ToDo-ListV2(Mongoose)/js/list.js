const dbhelper = require(__dirname + "/dbHelper.js");

exports.getList = function(_list){
    dbhelper.List.findOne({name: _list}, function(err, list){
      if (err){
        console.log(err);
      }else{
        if (list && list.name.length>0){
          console.log("found list: " + list.name);
          return list;
        }else{
          console.log("Creating list...");
        }
        }
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
