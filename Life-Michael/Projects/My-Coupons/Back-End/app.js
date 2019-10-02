//jshint esversion:6

//require server libreries
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
require('dotenv').config();

//server configurations
const app = express();
const port = process.env.PORT || 80;
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => { console.log("Succssefuly started server at port: " + port) });

//app routes
//app.get("/", (req, res) => { res.sendFile("/../Front-End/my-coupons/public/index.html") });

app.get("/login", (req, res) => {

});

app.route("/coupons").get((req, res) => {
    _connect();
    Coupon.find({}, (err, foundCoupons) => {
        if (err) {
            console.log(err);
        } else {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.send(foundCoupons);
        }
    });

}).post((req, res) => {
    const coupon = new Coupon({
        name: req.body.name,
        validThrough: req.body.validThrough,
        price: req.body.price,
        img: req.body.img,
        likes: '',
        buyers: ''
    });
    _connect();
    coupon.save();
});

//mongoose (mongodb) configurations
const connectionString = process.env.CONNECTION_STRING;
const _connect = () => {
    //console.log(connectionstring);
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    mongoose.set("useCreateIndex", true);
};

const couponSchema = new mongoose.Schema({
    name: String,
    validThrough: Date,
    price: Number,
    img: String
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    coupons: [couponSchema]
});

userSchema.plugin(passportLocalMongoose);

const likesSchema = new mongoose.Schema({
    coupon: couponSchema,
    qty: Number,
    buyers: [userSchema]
});

const Coupon = new mongoose.model("Coupon", couponSchema);