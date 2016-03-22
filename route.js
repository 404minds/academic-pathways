var nodemailer = require('nodemailer');
var Promise = require("bluebird");
var constant = require('./constants.js');
// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
		MongoClient.connect("mongodb://localhost:27017/acdpathway", function(err, db) {
		  if(err) { 
		  	return console.dir(err);
		   }else {
		   	return console.log("We are connected");
		  }
		   
		});

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    host: constant.HOST,
    secure: constant.SECURE,
    port: constant.PORT,
    auth: {
        user: constant.USER,
        pass: constant.PASS
    }
});

Promise.promisifyAll(transporter);


var route = function(app) {
	app.get('/mail' ,function(req,res) {
		
	});

	app.post('/register', function(req,res) {
		// setup e-mail data with unicode symbols
		var mailOptions = {
		    from: '"Academic Pathways" info@academicpathways.in', // sender address
		    to: req.body.email , // list of receivers
		    subject: 'Welcome to Academic Pathways', // Subject line
		    html: '<b style="text-transform: capitalize;">Hello '+req.body.name+',</b><br>\
		    <p>Thank you for registering with Academic Pathways.</p>\
		    <p>You have expressed your interest for ' +req.body.course+ ' course, in ' +req.body.location+ ' area. We will get back to you shortly.</p>\
		    <p>Feel free to contact us at <a href="tel:+91-7300737300">+91-7300737300,</a>\
            <a href="tel:+91-8126422892">+91-8126422892</a>.</p><br>\
			<p>- Team Academic Pathways</p>' // html body
		};

		var mailOptionsSelf = {
			from: '"Academic Pathways" info@academicpathways.in', // sender address
		    to: 'info@academicpathways.in,acdpathway@gmail.com' , // list of receivers
		    subject: 'New User Registration', // Subject line
		    html: '<strong>Name:</strong> ' + req.body.name + '<br>\
		    <strong>Email:</strong> ' + req.body.email + '<br>\
		    <strong>Contact:</strong> ' + req.body.contact + '<br>\
		    <strong>Course:</strong> ' + req.body.course + '<br>\
		    <strong>Highest Qualification:</strong> ' + req.body.hqual + '<br>\
		    <strong>Experience(yrs):</strong> ' + req.body.exper + '<br>\
		    <strong>Location:</strong> ' + req.body.location + '<br>'
		};

		var mailPromises = [];
		mailPromises.push(transporter.sendMailAsync(mailOptions));
		mailPromises.push(transporter.sendMailAsync(mailOptionsSelf));

		Promise.all(mailPromises)
			.then(function() {
				// Success
				res.sendStatus(200);
			})
			.catch(function(ex) {
				// Error
				res.sendStatus(500);
			});
	});

	app.post('/subscribe', function(req, res) {

	    // Get our form values. These rely on the "name" attributes
	    var name = req.body.name;
	    var email = req.body.email;
	    var contact = req.body.contact;

		// setup e-mail data with unicode symbols
		var mailOptions = {
		    from: '"Academic Pathways" info@academicpathways.in', // sender address
		    to: req.body.email , // list of receivers
		    subject: 'Welcome to Academic Pathways', // Subject line
		    html: '<b style="text-transform: capitalize;">Hello '+req.body.name+',</b><br>\
		    <p>Thank you for subscribing with Academic Pathways.</p>\
		    <p>Feel free to contact us at <a href="tel:+91-7300737300">+91-7300737300,</a>\
            <a href="tel:+91-8126422892">+91-8126422892</a>.</p><br>\
			<p>- Team Academic Pathways</p>' // html body
		};

		var mailOptionsSelf = {
		    from: '"Academic Pathways" info@academicpathways.in', // sender address
		    to: 'info@academicpathways.in,acdpathway@gmail.com' , // list of receivers
		    subject: 'New User Subscription', // Subject line
		    html: '<strong>Name:</strong> ' + req.body.name + '<br>\
		    <strong>Email:</strong> ' + req.body.email + '<br>\
		    <strong>Contact:</strong> ' + req.body.contact + '<br>'
		};

		var mailPromises = [];
		mailPromises.push(transporter.sendMailAsync(mailOptions));
		mailPromises.push(transporter.sendMailAsync(mailOptionsSelf));

		Promise.all(mailPromises)
			.then(function() {
				// Success
		    	res.sendStatus(200);
			})
			.catch(function(ex) {
				// Error
				res.sendStatus(500);
			});

		// Submit to the DB
		req.db.subscribe.insert({
	        "name" : name,
	        "email" : email,
	        "contact": contact
	    }, function (err, doc) {
	        if (err) {
	            // If it failed, return error
	            res.send("There was a problem adding the information to the database.");
	        }
	        else {
	            // And forward to success page
	            res.redirect("userlist");
	        }
	    });

	});

	

}

module.exports = route;
