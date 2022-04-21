module.exports = {
    environment: process.env.NODE_ENV || 'development',
    sslConfig: { useSSL:process.env.USE_SSL && process.env.USE_SSL.toLowerCase() === 'true', crtFile: 'sslcert/local.crt', keyFile: 'sslcert/local.key' },
    PORT: process.env.PORT || 3000,
    JWT_KEY: process.env.JWT_KEY || 'Best_Be_Overridding_THIS_for__SECURITY__',
    PASSWORD: '123a',
    USERNAME: 'email@domain.com',
    FIRST: 'Jerry',
    LAST: 'Sienfeld',
    

}