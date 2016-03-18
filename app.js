var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


//set route 
app.post('/',function(req,res){
	res.send("hello"+req.body.name+"\nEmail:"+req.body.email+"\nContact:"+req.body.contact+"\nIntrested Course:"+req.body.course+"\nQualification:"+req.body.qualification+"\nExperince:"+req.body.experience+"\nLocation:"+req.body.location+"\n");
})

// set port
var port = process.env.PORT || 5000;

app.listen(port);

console.log("starting with port: " + port);