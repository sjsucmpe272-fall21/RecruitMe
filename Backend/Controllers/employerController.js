const Employer = require("../Models/EmployerSchema");
const Job = require("../Models/JobSchema");
const Candidate = require("../Models/CandidateSchema");

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

exports.get_company = async (req,res) =>
{
    return Employer.find({email: req.body.email}).exec(function(err, result) {
        if (err) 
        {
            res.render('error', {
                status: 500
            });
        } 
        else 
        {
            res.json(result)
        }
    });
}

exports.get_jobs = async (req,res) =>
{
    return Job.find({company: req.body.company}).exec(function(err, result) {
        if (err) 
        {
            res.render('error', {
                status: 500
            });
        } 
        else 
        {
            res.json(result)
        }
    });
}

exports.get_applied_candidates = async (req,res) =>
{
    let app_can = {}
    for (job_id in req.body)
    {
        app_can[job_id] = []
        let candidates = req.body[job_id]
        for (i in candidates)
        {
            let candidate_id = candidates[i]
            let candidate = await Candidate.find({_id:candidate_id})
            app_can[job_id].push(candidate[0])
        }
    }
    res.send(app_can)
}

exports.get_selected_candidates = async (req,res) =>
{
    let sel_can = {}
    for (job_id in req.body)
    {
        sel_can[job_id] = []
        let candidates = req.body[job_id]
        for (i in candidates)
        {
            let candidate_id = candidates[i]
            let candidate = await Candidate.find({_id:candidate_id})
            sel_can[job_id].push(candidate[0])
        }
    }
    res.send(sel_can)
}