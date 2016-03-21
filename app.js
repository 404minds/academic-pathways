var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// Allow Cross Domain
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,POST,HEAD');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Expose-Headers", "Location");
	next();
});

// set your routes 
var route = require('./route')(app);


// Initialize app
var server = app.listen(process.env.PORT || 5000, function() {
	var port = server.address().port;
    console.log("Academic Pathways App is now running on port", port);
});
