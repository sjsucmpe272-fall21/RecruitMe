const Employer = require("../Models/EmployerSchema");
const Job = require("../Models/JobSchema");
const Candidate = require("../Models/CandidateSchema");

exports.getEmployerProfile = (req, res)=> {
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
    Job.findById(req.body._id, (err,doc) => 
    {
        if (err)
        {
            res.send("Job not found.")
        }
        else
        {
            doc.candidates_selected.push(req.body.candidate_id)
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

exports.get_company_fromid = async (req,res) =>
{
    return Employer.find({_id: req.body.userID}).exec(function(err, result) {
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
            try
            {
                let candidate_id = candidates[i]
                let candidate = await Candidate.find({_id:candidate_id})
                app_can[job_id].push(candidate[0])  
            }
            catch
            {
                continue
            }
            
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
            try
            {
                let candidate = await Candidate.find({_id:candidate_id})
                sel_can[job_id].push(candidate[0])
            }       
            catch
            {
                continue
            }
            
        }
    }
    res.send(sel_can)
}

exports.getCandidates = (req,res)=>{
    var jobId = req.body.jobId;
    // var candidates_applied = Job.find({_id:jobId})
    // .select("candidates_applied")
    // .exec()
    // .then((result)=>res.json(result))
    // .catch((err)=>console.log(err))

    var candidates_applied = Job.find()
    .select("candidates_applied")
    .exec()
    .then((result)=>res.json(result))
    .catch((err)=>console.log(err))
    return Candidate.find({
        '_id' : {
            $in: candidates_applied
        }
    })
}

exports.createNewJob = (req, res) => {
    console.log('createnewjob req.body ', req.body);
    let result;
    try{
        result = new Job({
            name: req.body.jobName,
            jobType: req.body.type,
            jobDescription: req.body.description,
            company: req.body.company,
            jobLocation: req.body.location,
            senorityLevel: req.body.seniorityLevel,
            applyLink: req.body.applyLink,
            dateposted: req.body.datePosted,
            industries: req.body.industries,
            country: req.body.country,
            skills: req.body.skills
        });
        result.save((err, data) => {
            if(err) {
                console.log('error in saving to db ', err);
                res.status(500).end('Error occured in saving to db');
            }
            else {
                console.log('create new job successful');
                res.status(200).end('create new job successful');
            }
        })
    }
    catch(err) {
        console.log(err);
        res.status(500).end('Error in query execution in creating job ');
    }

}

// xports.getCandidates = (req,res)=>{
//     var jobId = req.body.jobId;

//     returnJob.find()
//     .exec()
//     .then((result)=>res.json(result))
//     .catch((err)=>console.log(err))
  
// }