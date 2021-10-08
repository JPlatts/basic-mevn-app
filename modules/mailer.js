
let nodemailer = require('nodemailer');
const { smtpSettings } = require('../modules/config');

function mailer() {

  function initTransport () {
    let transport = nodemailer.createTransport({
      host: smtpSettings.server,
      port: smtpSettings.port,
      auth: {
         user: smtpSettings.user,
         pass: smtpSettings.password
      }
    });
    return transport;
  }
    

  // this.pwResetEmail = (user, link) => {
  //   let transport = initTransport();
  //   const message = {
  //       from: 'pw-reset@plattswork.com', // Sender address
  //       to: user.email,         // List of recipients
  //       subject: 'Password reset request', // Subject line
  //       html: `<p>Please follow this link to set your password</p><p><a href="${link}">RESET PASSSWORD</a></p>` // Plain text body
  //   };
  //   transport.sendMail(message, function(err, info) {
  //       if (err) {
  //         console.log(err)
  //       }
  //   });
  // }

  this.registrationMail = async (user, link) => {
    let transport = initTransport();
    const message = {
        from: 'registration@plattswork.com', // Sender address
        to: user.email,         // List of recipients
        subject: 'PlattsWork.com Registration', // Subject line
        html: `<p>Thank you for registering with PlattsWork.com</p><p>Please follow this link to confirm your account registration:</p><p><a href="${link}">Confirm Account</a></p>` // Plain text body
    };
    return  await transport.sendMail(message);
    
  }
    
}

module.exports = new mailer();