var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//===================================
//ROUTES
//===================================

app.get("/", function(req, res){
	res.render("index");
});

app.get("/about", function(req, res){
	res.render("about");
});

app.get("/contact", function(req, res){
	res.render("contact");
});

app.get("/submit", function(req, res){
	res.render("submit");
});

// app.post("/contact", function(req, res) {
//     var mailOptions = {
//         from: '"Akul" <akul2001mehta@gmail.com>', // sender address
//         to: "akul2001mehta@gmail.com", // list of receivers
//         subject: req.body.subject, // Subject line
//         text: req.body.message // plaintext body

//     };

app.post("/contact", function(req, res) {
    // Not the movie transporter!
    
    // var fromForm = {"name: name"};
    var transporter = nodemailer.createTransport({
        service: 'zoho',
        auth: {
            user: 'contact-us@acmeengineers.co.in', // Your email id
            pass: 'Acmeking$69' // Your password
        }
    });
		    var text = req.body.message;
		    var subject = req.body.subject;
		    var mailOptions = {
		    from: 'contact-us@acmeengineers.co.in', // sender address
		    to: ['acmeengineers69@gmail.com', 'contact-us@acmeengineers.co.in', 'info@acmeengineers.co.in', 'akul2001mehta@gmail.com'], // list of receivers
		    to: 'akul2001mehta@gmail.com',
		    subject: subject, // Subject line
		    text: "Name: "+req.body.firstName+" "+req.body.lastName+" | Company Name: "+req.body.company+" | "+"Contact No: "+req.body.phone+ " | [[]]--- Message Begins --[[]]-> "+text //, // plaintext body
		    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
		};
			transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		        //res.json({yo: 'error'});
		    }else{
		        console.log('Message sent: ' + info.response);
		        //res.json({yo: info.response});
		        res.redirect("/submit");
		        alert("Your Query has been submitted");
		    };
		});
});


 //   smtpTransport.sendMail(mailOptions, function(err, info) {
 //         if (err) {
 //             return console.log(err);
 //         }
 //         console.log("Message sent");
 //     });
 //   res.redirect("/");
 // });

// app.post("/contact", function(req, res){
// 	res.send("Posting");
// });



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Acme Server Has Started!");
});