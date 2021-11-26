
let nodemailer = require('nodemailer');
const { smtpSettings } = require('../modules/config');
const axios = require('axios').default;

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
    
  

  this.registrationMail = async (user, link) => {
    let subject = 'PlattsWork.com Registration';
    let html = `<p>Thank you for registering with PlattsWork.com</p>
                <p>Please follow this link to confirm your account registration:</p><p>
                <a href="${link}">Confirm Account</a></p>`;
    return await this.sendMail(user, subject, html);
  }

  this.pwResetMail = async (user, resetCode) => {
    let subject = 'PlattsWork.com Password Reset';
    let html = `<p>Please use this code to reset your password.</p>
                <p>${resetCode}</p>`;
    return await this.sendMail(user, subject, html);
    
  }

  this.sendMail = async (user, subject, html) => {
    if (smtpSettings.useSendGrid) {
      let options = {
        method: 'POST',
        url: `https://${smtpSettings.sendGridHost}/mail/send`,
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-host': smtpSettings.sendGridHost,
          'x-rapidapi-key': smtpSettings.sendGridKey
        },
        data: {
          personalizations: [{to: [{email: user.email}], subject: subject}],
          from: {email: smtpSettings.fromAddress},
          content: [{type: 'text/html', value: html}]
        }
      }
      try {
        let response = await axios.request(options);
        return !!response;
      } catch(err) {
        console.log(err)
        return false;
      }
    } else {
      let transport = initTransport();
      const message = {
          from: smtpSettings.fromAddress, // Sender address
          to: user.email,         // List of recipients
          subject: subject, // Subject line
          html: html // Plain text body
      };
      let mailInfo = await transport.sendMail(message);
      return !!mailInfo;
    }
  }
}

module.exports = new mailer();