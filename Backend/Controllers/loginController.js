const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Employer = require('../Models/EmployerSchema');
const Candidate = require('../Models/CandidateSchema');
const Company = require('../Models/CompanySchema');
const { auth } = require('../Utils/auth');
const otp_generator = require('otp-generator');
const mailTransporter = require('../Utils/mailer');
const { locals } = require('..');

auth();

const getOTP = () => {
    const otp = otp_generator.generate(6, { lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false });
    return otp;
}

exports.mailOTP = async (req, res) => {
    console.log('mailOTP req.body ', req.body);
    const otp = getOTP();
    console.log('otp ', otp);
    try{
        const mailOptions = {
            from: 'recruitmemailer@gmail.com',
            to: req.body.email,
            subject: 'OTP Verification',
            html: `<h1>OTP : ${otp}</h1>`,
          };

          mailTransporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
            console.log(info);
          });

          res.status(200).end(JSON.stringify(otp));
    }
    catch(error) {
        console.log('error ', error);
        res.status(500).end('error ', error);
    }
}

exports.login = async (req, res) => {
    console.log('in login backend req.body ', req.body);
    try {
        let user;
        if(req.body.userType === 'Employer') {
            user = await Employer.findOne({email: req.body.email});
        }
        else if(req.body.userType === 'Candidate') {
            user = await Candidate.findOne({email: req.body.email});
        }
        else if(req.body.userType === 'Company') {
            user = await Company.findOne({email: req.body.email});
        }
        console.log('user from db ', user);
        
        let isPasswordMatch = await bcrypt.compare(req.body.password, user.encry_password);
        if(isPasswordMatch) {
            // if( !== req.body.otp) {
            //     localStorage.removeItem('otp');
                // res.status(401).end('Invalid OTP');
            // }
            const payload = { _id: user._id, user: user, userType: req.body.userType};
            const token = jwt.sign(payload, 'recruitme', {expiresIn: 1008000});
            // localStorage.removeItem('otp');
            res.status(200).end('Bearer '+ token);
        }
        else {
            console.log('Password does not match ');
            // localStorage.removeItem('otp');
            res.status(401).end('Invalid Credentials');
        }
    }
    catch(err) {
        console.log('error ', err);
        res.status(500).end('Error occured');
    }
}