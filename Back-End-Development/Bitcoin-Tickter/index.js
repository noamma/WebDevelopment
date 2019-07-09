const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.listen(4500, function(){
  console.log("Server start listening at port 4500");
});
app.get("/", function(req, res){


  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res){
  var cCoin = req.body.crypto;
  var fCoin = req.body.fiat;
  var amount = req.body.amount;
  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: cCoin,
      to: fCoin,
      amount: amount
    }
  };
  request(options, function(error, response, body){
    console.log(response.statusCode);
    if(response.statusCode === 200){
      var data = JSON.parse(body);
      var price = data.price;
      var currentDate = data.time;
      res.write("<p>The current date is " + currentDate +  "</p>");
      res.write("<h1>" + amount + cCoin + " current worth is " + price + fCoin + "</h1>");
      res.send();
    }

  });

});
