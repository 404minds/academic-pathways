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
		// setup e-mail data with unicode symbols
		var mailOptions = {
		    from: 'info@academicpathways.in', // sender address
		    to: 'rinki.bansal07@gmail.com', // list of receivers
		    subject: 'Hello', // Subject line
		    text: 'How r u doing', // plaintext body
		    html: '<b>Hello world</b>' // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		        res.sendStatus(500);
		        return false;
		    }

		    res.sendStatus(200);
		});


	});

	app.post('/register', function(req,res) {
		var x = "hello"+req.body.name+"\nEmail:"+req.body.email+"\nContact:"+req.body.contact+"\nIntrested Course:"+req.body.course+"\nQualification:"+req.body.hqual+"\nExperince:"+req.body.exper+"\nLocation:"+req.body.location+"\n";
		res.send(x);
	});

}

module.exports = route;
