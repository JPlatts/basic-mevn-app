//load environment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const { PORT } = require('./modules/config');
const cors = require('cors');
const morgan = require('morgan');

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())


//initialize mongo db
const db = require('./modules/init-db');


app.use('/api/users', require('./routes/users'));
app.use('/api/deciders', require('./modules/auth-middleware'));
app.use('/api/deciders', require('./routes/deciders'));


if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

app.listen(PORT, () => {
   console.log(`Environment - ${process.env.NODE_ENV}`);
    console.log(`basic-app listening for http requests on port ${PORT} at http://localhost:${PORT}`)
    
});
