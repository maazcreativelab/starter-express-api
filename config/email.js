const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: 'aacreativeemb.com',
  port: 465,
  // secure:true,
  auth: {
    user: 'admin@aacreativeemb.com',
    pass: 'PASSpass!12345',
  },
});

module.exports={transporter}