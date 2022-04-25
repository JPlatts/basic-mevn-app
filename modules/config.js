module.exports = {
    environment: process.env.NODE_ENV || 'development',
    sslConfig: { useSSL:process.env.USE_SSL && process.env.USE_SSL.toLowerCase() === 'true', crtFile: 'sslcert/local.crt', keyFile: 'sslcert/local.key' },
    PORT: process.env.PORT || 3080,
    JWT_KEY: process.env.JWT_KEY || 'Best_Be_Overridding_THIS_for__SECURITY__',
    PASSWORD: '123a',
    USER: { _id: 1, email: 'email@domain.com', firstName: 'FirstName', lastName: 'LastName'  },
    SCRIPT_LOCATION: 'c:\\test\\helloworld.ps1',
}