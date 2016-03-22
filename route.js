var nodemailer = require('nodemailer');
var Promise = require("bluebird");
var constant = require('./constants.js');
// Retrieve
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/acdPathways';

// Connect to the db
// MongoClient.connect("mongodb://localhost:27017/acdpathways", function(err, db) {
//   if (err) { 
//   	return console.dir(err);
//    } else {
//    	mdb = db;
//    	return console.log("We are connected");
//   }
   
// });

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

		// Connect to db
		
		var promises = [];

		MongoClient.connect(url, function(err, db) {
		  if (err) { 
		  	console.log(err);
		   } else {
		   
		   	var subscribeCollection = db.collection('subscribe');
		   	Promise.promisifyAll(subscribeCollection);

		   	promises.push(subscribeCollection.insertAsync({ "name" : name, "email" : email, "contact": contact}));

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

			promises.push(transporter.sendMailAsync(mailOptions));
			promises.push(transporter.sendMailAsync(mailOptionsSelf));

			Promise.all(promises)
				.then(function() {
					// Success
			    	res.sendStatus(200);
				})
				.catch(function(ex) {
					// Error
					res.sendStatus(500);
				});
		   }

		});

	});
}

module.exports = route;
