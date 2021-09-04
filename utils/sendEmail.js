const nodemailer = require("nodemailer");

//this is a multi purpose email sending module

const sendEmail = (options) =>{

    //first create transporter -> set things in environment variables.
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })


    //mail options comes mainly from the passed in options.
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    }

    //use the transporter to actually send the mail, log errors.
    transporter.sendMail(mailOptions, function(err,info){
        if(err){
            console.log(err);
        } else{
            console.log(info);
        }
    })
}

module.exports = sendEmail;