const nodemailer = require('nodemailer');
require("dotenv").config();


//send mail logic
      // create reusable transporter object using the default SMTP transport
      module.exports = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USERNAME, // generated ethereal user
          pass: process.env.SMTP_PASSWORD// generated ethereal password
        },
      });
    