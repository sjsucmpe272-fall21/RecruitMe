const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Employer = require('../Models/EmployerSchema');
const Candidate = require('../Models/CandidateSchema');
const Company = require('../Models/CompanySchema');
const { auth } = require('../Utils/auth');

auth();

exports.login = async (req, res) => {
    console.log('in login backend req.body ', req.body);
    try {
        let user;
        if(req.body.isEmployer) {
            user = await Employer.findOne({email: req.body.email});
        }
        else {
            user = await Candidate.findOne({email: req.body.email});
        }
        console.log('user from db ', user);
        
        let isPasswordMatch = await bcrypt.compare(req.body.password, user.encry_password);
        if(isPasswordMatch) {
            const payload = { _id: user._id, user: user, isEmployer: req.body.isEmployer};
            const token = jwt.sign(payload, 'recruitme', {expiresIn: 1008000});
            res.status(200).end('Bearer '+ token);
        }
        else {
            console.log('Password does not match ');
            res.status(401).end('Invalid Credentials');
        }
    }
    catch(err) {
        console.log('error ', err);
        res.status(500).end('Error occured');
    }
}