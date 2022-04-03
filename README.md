# basic-mevn-app
A basic single page web application (SPA) with an API for jwt based authentication, account registration, and password management.

This project is a great starter for building a web application with membership on the mevn stack.

<p align="left">
  <img src="./client/src//assets/MongoDB_Logo_RGB_Logo_Forest-Green.svg" height="80" alt="MongoDB" title="MongoDB">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./client/src//assets/express-js-seeklogo.com.svg" height="80" alt="Express" title="Express">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./client/src/assets/vue-js-seeklogo.com.svg" height="80" alt="Vue" title="Vue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./client/src/assets/Node.js_logo.svg" height="80" alt="Vue" title="Vue">
</p>

## Table of Contents  
[Prerequisites](#Prerequisites)  

[Installation](#Installation) 

[Debugging](#Debugging) 

## Prerequisites
1.  git - [git-scm.com](https://git-scm.com)
2.  node/npm - [nodejs.org](https://nodejs.org)
3.  MongoDB instance - [www.mongodb.com](https://www.mongodb.com)
4.  SMTP server, or a SendGrid API account - [sendgrid.com](https://sendgrid.com)

Note:  [MailTrap.io](https://mailtrap.io) is a great substitute for a development SMPT server. Mailtrap is a sandbox smpt service that works great for running and debugging this project without having to send real emails.

## Installation
1. Clone the repository
```
git clone https://github.com/JPlatts/basic-mevn-app.git
```
2. Change Directory
```
cd basic-mevn-app
```
3. Install server dependencies
```
npm run install-server
```
3. Install client dependencies
```
npm run install-client
```

## Debugging
Option 1: Run client and server from a single terminal (concurrently)
```
npm run dev
```
Option 2: Run the client and server in separate terminals

Terminal One:
```
npm run server
```

Terminal Two:
```
npm run client
```
