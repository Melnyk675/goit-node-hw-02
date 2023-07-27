const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mylock@gmail.com',
    pass: 'your-password'
  }
});

const mailOptions = {
  from: 'mylock@gmail.com',
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