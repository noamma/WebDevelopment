const mongoose = require("mongoose");
//const encrypt = require("mongoose-encryption");
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
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

exports.registerUser = (_username, _password, _callback)=>{
  _connect();
  User.register({username: _username}, _password, (err, user)=>{
    if(err){
      console.log("User.register produced an error: " + err);
      _callback(err,null);
    }else{
      _callback(null,user);
    }
  });
};

exports.loginUser = (_username, _password, req, res,_callback)=>{
  let user = new User({username: _username, password: _password});
  _connect();
  req.login(user, (err)=>{
    if (err){
      console.log("Req.login returned with an error: " + err);
    }else{
      passport.authenticate("local")(req, res, ()=>{
          //console.log("authentication triggerd");
          _callback(null, user);
      });
    }
  });
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    //required: true},
  },
  password: {
    type: String,
    //required: true
  }
});

// , (err, user, info)=>{
//   if(err){
//     console.log(err);
//     return err;
//   }else{
//     if(!user){
//       console.log(info.message);
//       return info.message;
//     }
//     console.log("authentication user: " + user);
//     _callback(null, user);
//   }
// }

//userSchema.plugin(encrypt, {secret: dbcs.getCryptoString(), encryptedFields: ['password']});
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
