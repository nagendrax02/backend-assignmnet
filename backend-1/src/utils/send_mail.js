const transporter = require('../config/mail');   
  // send mail with defined transport object

  const sendEmail = async({to,from,subject,text,html})=>{
    await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html
      });
  }
   
 module.exports = sendEmail;