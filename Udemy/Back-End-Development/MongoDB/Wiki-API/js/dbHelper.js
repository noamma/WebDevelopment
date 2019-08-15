const mongoose = require("mongoose");
const dbcs = require(__dirname + "/dbcs.js");
const connectionstring = dbcs.getConnectionString();
exports.connect = function(){
  //console.log(connectionstring);
  mongoose.connect(connectionstring,{
    useNewUrlParser: true,
    useFindAndModify: false});
}

exports.getAllArticles = (_callback)=>{
  Article.find({}, (err, foundArticles)=>{
    if(err){
      console.log(err);
    }else{
      _callback(foundArticles);
    }
  });
};

exports.deleteAllArticles = (_callback)=>{
  Article.deleteMany({}, (err, result)=>{
    if(err){
      console.log(err);
    }else{
      _callback(result);
    }
  });
};

exports.addNewArticle = (_articleTitle, _articleContent, _callback)=>{
  let article = new Article(
    {
      title: _articleTitle,
      content: _articleContent
    }
  );
  article.save();
  _callback(article);
}

exports.removeListItem = function(listName, itemId, _callback){
  List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: itemId}}}, function(err, foundList){
    if (err){
      console.log(err);
    }else{
      if(foundList && foundList.name.length >0){
        console.log("Successfuly removed item id: " + itemId);
        console.log("from list: " + foundList.name);
        // console.log("counting 5 sec\' before triggring callback");
        // setTimeout(function(){_callback(foundList.name);}, 5000);
        _callback(foundList.name);
      }
    }
  });
};

exports.addListItem = function(listName, itemName, _callback){
  List.findOne({name: listName}, (err, foundList)=>{
    if(err){
      console.log(err);
    }else{
      if(foundList && foundList.name.length>0){
        item = new Item({name: itemName});
        foundList.items.push(item);
        foundList.save();
        _callback();
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

const articleSchema = {
  title: {
    type: String,
    required: true
  },
  content: String
};

const Article = mongoose.model("Article", articleSchema);

const Item = mongoose.model("Item", itemsSchema);

//exports.List = List;

//exports.Item = Item;;

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
