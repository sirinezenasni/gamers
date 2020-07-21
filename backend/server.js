const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cors = require('cors');
const secret = 's3cr3t1000';

const UsersModel = require('./models/UsersModel.js');

const passportJwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

const passportJwt = (passport) => {
    passport.use(
        new JwtStrategy (
            passportJwtOptions,
            (jwtPayload, done) => {
                // Extract and find the user by their id (containted jwt)
                UsersModel.findOne({_id: jwtPayload.id})
                    .then(
                        // If the document was found 
                        (document) => {
                            return done (null, document);
                        }
                    )
                    .catch(
                        //If something went wrong with database search
                        (err) => {
                            return done (null, null);
                        }
                    )
            }
        )
    )
};

const server = express();

server.use(bodyParser.urlencoded({ extended: false}));
server.use(bodyParser.json());
server.use(passport.initialize());
server.use(cors());

passportJwt(passport);

const dbURL = "mongodb+srv://Admin:NewPassword@cluster0-l5lpl.mongodb.net/gamers?retryWrites=true&w=majority";

const UsersRoutes = require('./routes/UsersRoute.js');
const PostListingRoute = require('./routes/PostListingRoute.js');
const PostRoute = require('./routes/PostRoute.js');

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

server.use(
    '/postlisting',
    passport.authenticate('jwt', {session: false}),
    PostListingRoute,
);

server.use(
    '/post',
    passport.authenticate('jwt', {session: false}),
    PostRoute,
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