const Company = require('../Models/CompanySchema');

exports.getAllCompanies = async (req,res) =>
{
    return Company.find({}).exec(function(err, result) {
        if (err) 
        {
            res.render('error', {
                status: 500
            });
        } 
        else 
        {
            res.json(result);
        }
    });
}