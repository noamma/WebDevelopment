//jshint esversion:6

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
    mongoose.set("useCreateIndex", true);
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

exports.getUser = (_userId, _callback)=>{
  console.log("searching for userId: "+ _userId);
  User.findById(_userId, (err, foundUser)=>{
    if(err){
      _callback(err,null);
    }else if (foundUser){
      console.log(foundUser);
      _callback(null,foundUser);
      }else{
      _callback(null,null);
    }
  });
};

// exports.validateCredentials = (req,  _callback)=>{
//   console.log(_callback);
//   _connect();
//   console.log("Connecting to db checking if user exists..");
//   const user = new User({email: req.body.email, password: req.body.password});
//   req.login(user,(err,_user)=>{
//     if (_user){
//       _callback(user);
//         }else{
//               console.log("db message: login rejected due to password missmatch");
//               _callback(err);
//             }
//           });
//     };


// User.findOne({email: _username}, (err, foundUser)=>{
//   if(err){
//     console.log(err);
//   }else if (foundUser){
//     console.log(foundUser.email);
//     bcrypt.compare(_password, foundUser.password, (err, result)=>{
//       if (result === true){
//         _callback(foundUser);
//       }else{
//         console.log("db message: login rejected due to password missmatch");
//         _callback("reject");
//       }
//     });
//   }else{
//     _callback(null);
//   }
// });


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

exports.loginUser = (req, res,_callback)=>{
  var _username = req.body.username;
  var _password = req.body.password;

  let user = new User({username: _username, password: _password});
  _connect();
  req.login(user, (err)=>{
    if (err){
      console.log("Req.login returned with an error: " + err);
    }else{
      passport.authenticate("local")(req, res, ()=>{
          console.log("authentication triggerd");
          _callback(null, user);
      });
    }
  });
};

exports.postSecret = (req, _callback)=>{
  const secret = req.body.secret;
  const userId = req.user.id;

  console.log(userId);
  this.getUser(userId,(err,user)=>{
    if(err, null){
      _callback(err, null);
    }else{
      user.secret = secret;
      user.save(()=>{
        _callback(null,user.secret);
      });
    }
  });
}

exports.getSecrets = (_callback)=>{
  _connect();
  User.find({"secret": {$ne: null}}, (err, foundUsers)=>{
    if(err){
      _callback(err, null);
    }else{
      console.log(foundUsers);
      _callback(null,foundUsers);
    }
  });
}
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    //required: true},
  },
  password: {
    type: String,
    //required: true
  },
  secret: String
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
