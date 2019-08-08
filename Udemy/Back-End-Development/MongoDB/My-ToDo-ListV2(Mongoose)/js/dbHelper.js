const mongoose = require("mongoose");

exports.connect = function(){
  mongoose.connect("mongodb://localhost:27017/todolistDB",{
    useNewUrlParser: true,
    useFindAndModify: false});
}

exports.newList = function(_list){
  let list = new List(
    {
      name: _list,
      items: defaultItems
    }
  );
  list.save();
  return list;
}

exports.removeListItem = function(listName, itemId, _callback){
  List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: itemId}}}, function(err, foundList){
    if (err){
      console.log(err);
    }else{
      if(foundList && foundList.name.length >0){
        console.log("Successfuly removed item id: " + itemId);
        console.log("from list: " + foundList.name);
        console.log("counting 5 sec\' before triggring callback");
        setTimeout(function(){_callback(foundList.name);}, 5000);
      }
    }
  });
};
const itemsSchema = {
  name: {
    type: String,
    required: true
  }
};

const listSchema = {
  name: {
    type: String,
    required: true
  },
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

const Item = mongoose.model("Item", itemsSchema);

exports.List = List;

exports.Item = Item;;

const item1 = new Item({
  name: "Example item 1"
});

const item2 = new Item({
  name: "Example item 2"
});

const item3 = new Item({
  name: "Example item 3"
});

const defaultItems = [item1, item2, item3];

/*
Item.find(function(err, items){
  if(err){
    console.log(err);
  }else{
    if (items && items.length === 0){
      Item.insertMany(defaultItems, function(err){
        if (err){
          console.log(err);
        }else{
          console.log("Successfuly insert items");
        }
      });
      res.redirect("/");
    }else{
      res.render('list', {listTitle: "Today", items: items});
    }
  }
});
*/
