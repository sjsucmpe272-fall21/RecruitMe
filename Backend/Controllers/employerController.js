const Employer = require("../Models/EmployerSchema");

exports.getEmployerProfile = ()=> {
    var employerId = req.body.employerId;

    return Employer.find({employerId: employerId})
    .exec()
    .then((employer) => {
        return res.json(employer);
    })
    .catch(error=>{
        return {
            error: "No employer Found "+error
        };
    })
}