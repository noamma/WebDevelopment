const mongoose = require("mongoose");
//const encrypt = require("mongoose-encryption");
const bcrypt = require("bcrypt");
const dbcs = require(__dirname + "/dbcs.js");
const connectionString = dbcs.getConnectionString();

const _connect = ()=>{
  //console.log(connectionstring);
  mongoose.connect(connectionString,{
    useNewUrlParser: true,
    useFindAndModify: false});
};

// const _close = ()=>{
//   mongoose.close();
// }
exports.createNewUser = (_email, _password, _callback)=>{
  user = new User({
    email: _email,
    password: _password
  });
  _connect();
  user.save((err, result)=>{
    if(err){
      console.log(err);
    }else{
      //_close();
      _callback(result);
    }
  });
};

exports.validateCredentials = (_username, _password, _callback)=>{
  _connect();
  User.findOne({email: _username}, (err, foundUser)=>{
    if(err){
      console.log(err);
    }else if (foundUser){
      console.log(foundUser.email);
      bcrypt.compare(_password, foundUser.password, (err, result)=>{
        if (result === true){
          _callback(foundUser);
        }else{
          console.log("db message: login rejected due to password missmatch");
          _callback("reject");
        }
      });
    }else{
      _callback(null);
    }
  });
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true},
  password: {
    type: String,
    required: true
  }
});

//userSchema.plugin(encrypt, {secret: dbcs.getCryptoString(), encryptedFields: ['password']});

const User = new mongoose.model("User", userSchema);
