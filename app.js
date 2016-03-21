var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


// set your routes 

var route = require('./route')(app);


// set port
var port = process.env.PORT || 5000;

app.listen(port);

console.log("starting with port: " + port);