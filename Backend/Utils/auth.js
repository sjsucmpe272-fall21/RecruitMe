const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Candidate = require('../Models/CandidateSchema');
const Employer = require('../Models/EmployerSchema');
const Company = require('../Models/CompanySchema');
const bcrypt = require('bcrypt');

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
            const userType = jwtPayload.userType;
            if(userType === 'Employer') {
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
            else if(userType === 'Candidate'){
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
            else if(userType === 'Company') {
                Company.findById(userID, (err, results) => {
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