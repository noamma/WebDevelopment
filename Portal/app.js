const express = require('express');
const ejs = require('ejs');
const _ = require('lodash');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}), express.static('public'));

app.set('view engine', 'ejs');

app.get('/',(req, res)=>{res.render('home', {title: 'Home'});});

app.get('/hobbies',(req, res)=>{res.render('hobbies', {title: 'My hobbies'});});

app.get('/about',(req, res)=>{res.render('about', {title: 'About Me'});});

app.listen(3000, ()=>{console.log("server started at port: 3000");});
