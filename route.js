var nodemailer = require('nodemailer');
var Promise = require("bluebird");
var MongoClient = require('mongodb').MongoClient;
var constant = require('./constants.js');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    host: constant.HOST,
    secure: constant.SECURE,
    port: constant.PORT,
    auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_PASSWORD
    }
});

Promise.promisifyAll(transporter);

var route = function(app) {

	app.post('/register', function(req,res) {
		var spcl = null;
		for(var i = 0; i< req.body.specialization.length; i++) {
			if(req.body.specialization[i]) {
				spcl = req.body.specialization[i];
				break;
			}
		}
		// Connect to db
		var connect = Promise.promisify(MongoClient.connect);
		connect(process.env.MONGOLAB_URI)
			.then(function(db) {
				var promises = [];

				var collection = db.collection('register');

			   	Promise.promisifyAll(collection);

			   	collection.insertAsync(req.body)
			   		.then(function(docs) {

			   			var registrationId = docs.insertedIds[0];

			   			// setup email data
						var mailOptions = {
							from: '"Academic Pathways" info@academicpathways.in', // sender address
							to: req.body.email , // list of receivers
							subject: 'Welcome to Academic Pathways', // Subject line
							html: '<b style="text-transform: capitalize;">Hello '+req.body.name+',</b><br>\
							<p>Thank you for registering with Academic Pathways. Your registration id is <b>' + registrationId + '</b></p>\
							<p>You have expressed your interest for ' +req.body.course+ ' course, in ' +req.body.location+ ' area. We will get back to you shortly.</p>\
							<p>Feel free to contact us at <a href="tel:+91-7300737300">+91-7300737300,</a>\
							    <a href="tel:+91-8126422892">+91-8126422892</a>.</p><br>\
							<p>- Team Academic Pathways</p>' // html body
						};

						var mailOptionsSelf = {
							from: '"Academic Pathways" info@academicpathways.in', // sender address
							to: 'info@academicpathways.in,acdpathway@gmail.com' , // list of receivers
							subject: 'New User Registration - ' + registrationId, // Subject line
							html: '<strong>Registration ID:</strong> ' + registrationId + '<br>\
							<strong>Name:</strong> ' + req.body.name + '<br>\
							<strong>Email:</strong> ' + req.body.email + '<br>\
							<strong>Contact:</strong> ' + req.body.contact + '<br>\
							<strong>Course:</strong> ' + req.body.course + '<br>\
							<strong>Specialization:</strong> ' + spcl + '<br>\
							<strong>Highest Qualification:</strong> ' + req.body.hqual + '<br>\
							<strong>Experience(yrs):</strong> ' + req.body.exper + '<br>\
							<strong>Location:</strong> ' + req.body.location + '<br>'
						};

			   			promises.push(transporter.sendMailAsync(mailOptions));
						promises.push(transporter.sendMailAsync(mailOptionsSelf));

						Promise.all(promises)
						.then(function() {
							// Success
							res.sendStatus(201);
						})
						.catch(function(ex) {
							// Error
							console.log("Unable to send emails", ex);
							res.sendStatus(500);
						});
			   		})
			   		.catch(function(ex) {
			   			console.log("Unable to add document", ex);
			   			res.json({error: 'already_exists'});
			   		})

			})
			.catch(function(ex) {
				console.log("Unable to connect", ex);
			});
	});

	app.post('/subscribe', function(req, res) {

		// Connect to db
		var connect = Promise.promisify(MongoClient.connect);
		connect(process.env.MONGOLAB_URI)
			.then(function(db) {
				var promises = [];

				var collection = db.collection('subscribe');

			   	Promise.promisifyAll(collection);

			   	collection.insertAsync(req.body)
			   		.then(function(docs) {

			   			// setup email data
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
							res.sendStatus(201);
						})
						.catch(function(ex) {
							// Error
							console.log("Unable to send emails", ex);
							res.sendStatus(500);
						});
			   		})
			   		.catch(function(ex) {
			   			console.log("Unable to add document", ex);
			   			res.json({error: 'already_exists'});
			   		})

			})
			.catch(function(ex) {
				console.log("Unable to connect", ex);
				res.sendStatus(500);
			});

	});
}

module.exports = route;
