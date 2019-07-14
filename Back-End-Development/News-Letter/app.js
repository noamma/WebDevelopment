const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const mailchimpApiKey = "6639061a8f46daee5f6207f2a7d9fb66-us3";
const mailchimpApiServer = "us3";
const mailchimeListId = "ff3bfd2055";
const mailchimpApiUrl = "https://" + mailchimpApiServer + ".api.mailchimp.com/3.0/lists/" + mailchimeListId;
app.listen(4500, function(){
  console.log("Server starts listening on port 4500");
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  // res.write("<h1>User Detailes:<h1>");
  // res.write("<h3>First Name:</h3><em>" + req.body.firstname + "</em>");
  // res.write("<h3>Last  Name:</h3><em>" + req.body.lastname + "</em>");
  // res.write("<h3>Email Address:</h3><em>" + req.body.email + "</em>");
  // res.send();

  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var email = req.body.email;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  var jsonData = JSON.stringify(data);
  var options = {
    url: mailchimpApiUrl,
    method: "POST",
    headers: {
      "Authorization": "apikey " + mailchimpApiKey
    },
    body: jsonData
  };
  request(options, function(error, response, body){
    if(error){
      console.log(error);
    }else{
      console.log(response.statusCode);
      if(response.statusCode == 200){
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});


//MailChimp API-KEY
//6639061a8f46daee5f6207f2a7d9fb66-us3
