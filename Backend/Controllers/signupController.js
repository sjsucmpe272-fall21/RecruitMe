const bcrypt = require('bcrypt');
const Candidate = require('../Models/CandidateSchema');
const Company = require('../Models/CompanySchema');
const Employer = require('../Models/EmployerSchema');

exports.signup = async (req, res, done) => {
    console.log('req body ', req.body);
    try {
        let existingUser;
        if(req.body.user === 'employer') {
            existingUser = await Employer.findOne({email: req.body.email});
        }
        else if(req.body.user === 'candidate'){
            existingUser = await Candidate.findOne({email: req.body.email});
        }
        else if(req.body.user === 'company') {
            existingUser = await Company.findOne({email: req.body.email});
        }

        if(existingUser) {
            // res.writeHead(400, {
            //     'Content-type': 'text/plain'
            // });
            // res.end("User already exists!");
            res.status(400).end('User already exists!');
            // done(null, false, {message: 'User already exists!'});
        }

        let saltRounds = 10;
        let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        
        let result;
        if(req.body.user === 'employer') {
            result = new Employer({
                email: req.body.email,
                firstName: req.body.name.split(' ')[0],
                lastName: req.body.name.split(' ')[1],
                company: req.body.company,
                encry_password: hashedPassword
            });
        }
        else if(req.body.user === 'candidate') {
            result = new Candidate({
                email: req.body.email,
                firstName: req.body.name.split(' ')[0],
                lastName: req.body.name.split(' ')[1],
                company: req.body.company,
                encry_password: hashedPassword,
                phoneNumber: req.body.contactno,
                streetAddress: req.body.street,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                skills: req.body.skills
            });
        }
        else if(req.body.user === 'company') {
            result = new Company({
                email: req.body.email,
                name: req.body.name,
                password: hashedPassword,
                phone: req.body.contactno,
                description: req.body.description,
                industries: req.body.industries
            });

            result.address.push({
                street_address: req.body.street,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country
            })
        }

        result.save((err, data) => {
            if(err) {
                console.log('error in saving to db ', err);
                res.status(500).end('Error occured in saving to db');
                // done(err);
                // callback(err);
            }
            else {
                console.log('sign up successful');
                res.status(200).end('sign up successful');
                // done(null, data);
                // callback(null, data);
            }
        })
    }
    catch(err) {
        // console.log(err);
        // res.writeHead(400, {
        //     'Content-type': 'text/plain'
        // });
        // res.end("Error in query execution in finding user from DB ");
        res.status(500).end('Error in query execution in finding user from DB ');
        // done(err);
        // callback(err);
    }
}