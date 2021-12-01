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
            res.status(400).end('User already exists!');
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
            let fName = req.body.name.split(' ')[0];
            let lName = req.body.name.split(' ')[1];
            if(req.body.name.includes(' ') === false) {
                lName = '  ';
            }
            result = new Candidate({
                email: req.body.email,
                firstName: fName,
                lastName: lName,
                company: req.body.company,
                encry_password: hashedPassword,
                phoneNumber: req.body.contactno,
                streetAddress: req.body.street,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                skills: req.body.skills,
                githubId: req.body.githubId,
                resumeName: req.body.resumeName
            });
        }
        else if(req.body.user === 'company') {
            result = new Company({
                email: req.body.email,
                name: req.body.name,
                encry_password: hashedPassword,
                phone: Number(req.body.contactno),
                description: req.body.description,
                industries: req.body.industries,
                address: {
                    street_address: req.body.street,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country
                }
            }); 
        }

        result.save((err, data) => {
            if(err) {
                console.log('error in saving to db ', err);
                res.status(500).end('Error occured in saving to db');
            }
            else {
                console.log('sign up successful');
                res.status(200).end('sign up successful');
            }
        })
    }
    catch(err) {
        console.log(err);
        res.status(500).end('Error in query execution in finding user from DB ');
    }
}