const Employer = require("../Models/EmployerSchema");
const Job = require("../Models/JobSchema");

exports.getEmployerProfile = ()=> {
    var employerId = req.body.employerId;

    return Employer.find({_id: employerId})
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

exports.select_candidate = (req,res) =>
{
    Job.findById(req.body.job_id, (err,doc) => 
    {
        if (err)
        {
            res.send("Job not found.")
        }
        else
        {
            doc.candidatesSelected.push(req.body.candidate_id)
            doc.save()
        }
    })
}

exports.reject_candidate = (req,res) =>
{
    Job.findById(req.body.job_id, (err,doc) => 
    {
        if (err)
        {
            res.send("Job not found.")
        }
        else
        {
            const index = doc.candidatesSelected.indexOf(req.body.candidate_id)
            if (index > -1)
            {
                doc.candidatesSelected.splice(index)
                doc.save()
            }
        }
    })
}