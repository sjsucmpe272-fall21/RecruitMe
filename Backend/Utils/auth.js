const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Candidate = require('../Models/CandidateSchema');
const Employer = require('../Models/EmployerSchema');
const bcrypt = require('bcrypt');
// const config = require('../config/config.json');

function auth() {
    // console.log('in auth()');
    var options = {
        secretOrKey: 'recruitme',
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('Bearer')
    }
    passport.use(
        new JWTstrategy(options, (jwtPayload, done) => {
            console.log('in jwt auth() ');
            const userID = jwtPayload._id;
            const isEmployer = jwtPayload.isEmployer;
            // console.log('typeof isresto in jwt auth() ', typeof isRestaurant);
            if(isEmployer) {
                Employer.findById(userID, (err, results) => {
                    if(err) {
                        return done(err, false);
                    }
                    if(results) {
                        return done(null, results);
                    }
                    else {
                        return done(null, false);
                    }
                })
            }
            else {
                Candidate.findById(userID, (err, results) => {
                    if(err) {
                        return done(err, false);
                    }
                    if(results) {
                        return done(null, results);
                    }
                    else {
                        return done(null, false);
                    }
                })
            }
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate('jwt', {session: false});