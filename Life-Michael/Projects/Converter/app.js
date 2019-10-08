
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}), express.static('public'));

app.get('/', (req, res)=>{res.sendFile('/public/index.html');});



app.listen(80, ()=>{
  console.log('server started on port 80');
});
