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

exports.getCompanyProfile = (req, res)=> {
    var companyID = req.body.companyID;

    return Company.find({_id: companyID})
    .exec()
    .then((company) => {
        return res.json(company);
    })
    .catch(error=>{
        return {
            error: "No company Found "+error
        };
    })
}