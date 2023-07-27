const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
});

const mailOptions = {
  from: process.env.GMAIL_USER,
  to: 'destination-email@gmail.com',
  subject: 'Test email',
  text: 'Hello, this is a test email from nodemailer!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

module.exports = transporter;