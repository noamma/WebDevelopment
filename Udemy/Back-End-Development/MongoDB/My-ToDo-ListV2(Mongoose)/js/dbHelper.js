const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todolistDB",{
  useNewUrlParser: true,
  useFindAndModify: false});

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

exports.List = mongoose.model("List", listSchema);

exports.Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Example item 1"
});

const item2 = new Item({
  name: "Example item 2"
});

const item3 = new Item({
  name: "Example item 3"
});

exports.defaultItems = [item1, item2, item3];
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
