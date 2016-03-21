var nodemailer = require('nodemailer');
var constant = require('./constants.js');

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

		console.log(mailOptions);

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		        res.sendStatus(500);
		        return false;
		    }

		    console.log(info);
		    res.sendStatus(200);
		});
	});

	app.post('/subscribe', function(req,res) {
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

		console.log(mailOptions);

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		        res.sendStatus(500);
		        return false;
		    }

		    console.log(info);
		    res.sendStatus(200);
		});
	});


}

module.exports = route;
