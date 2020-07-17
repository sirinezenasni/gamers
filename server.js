const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const server = express();

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secret = 's3cr3t1000';

const dbURL = "mongodb+srv://Admin:NewPassword@cluster0-l5lpl.mongodb.net/gamers?retryWrites=true&w=majority";

const UsersModel = require('./models/UsersModel.js');

const UsersRoutes = require('./routes/UsersRoute.js');

server.use(bodyParser.urlencoded({ extended: false}));
server.use(bodyParser.json());
server.use(passport.initialize());

mongoose.connect(
    dbURL,
    {
        'useNewUrlParser': true,
        'useUnifiedTopology': true
    }
).then(
    () => {
        console.log('You are connected to MongoDB!');
    }
).catch(
    (e) => {
        console.log('catch', e);
    }
);

server.use(
    '/users',
    UsersRoutes,
);

server.get(
    '/',
    (req, res) => {
        res.send(
            "<h1>Welcome to Gamers</h1>"
        );
    }
);

server.listen( 
    8080, () => {
    console.log('You are connected! http://127.0.0.1:8080');
    }
);