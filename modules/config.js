module.exports = {
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost/basic-mevn-app',
    PORT: process.env.PORT || 3000,
    JWT_KEY: process.env.JWT_KEY || 'Best_Be_Overridding_THIS_for__SECURITY__',
    smtpSettings: {
      server: process.env.SMTP_SERVER || 'smtp.server.com',
      port: process.env.SMTP_PORT || 2525,
      user: process.env.SMTP_USR || '[smtp_auth_usr]',
      password: process.env.SMTP_PWD || '[smtp_auth_pwd]'
    },

}