const https = require("https");
const fs = require("fs");
const express = require("express");
const app = express();


const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
};
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);
