const Job = require("../Models/JobSchema");
const Candidate = require("../Models/CandidateSchema");
var mongoose = require('mongoose'); 

exports.getAllJobs = (req, res)=> {

    // return Job.find()
    // .exec()
    // .then((job) => {
    //     return res.json(job);
    // })
    // .catch(error=>{
    //     return {
    //         error: "No jobs Found " + error
    //     };
    // })

    Job.find(
        {},
        (err, doc) => {
            if(err) {
                console.log('error ', err);
            }
            else {
                console.log(doc);
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end(JSON.stringify(doc));
            }
        }
    )
}

exports.read_job = (req,res) =>
{
    Job.findById(req.body, (err,doc) => 
    {
        if (err)
        {
            res.send("Job not found.")
        }
        else
        {
            res.send(doc)
        }
    })
}

exports.create_job = (req,res) =>
{
    Job.create(req.body, (err,result) =>
    {
        if (err)
        {
            res.send('Error: ' + err)
        }
        else
        {
            res.send('Job created' + result)
        }
    })
}

exports.update_job = (req,res) =>
{
    Job.findByIdAndUpdate(req.body.id, req.body.new_values, (err,result) =>
    {
        if (err)
        {
            res.send('Error: ' + err)
        }
        else
        {
            res.send('Job Updated' + result)
        }
    })
}

exports.delete_job = (req,res) =>
{
    Job.findByIdAndRemove(req.body, (err,result) =>
    {
        if (err)
        {
            res.send('Error: ' + err)
        }
        else
        {
            res.send('Job Deleted' + result)
        }
    })
}


exports.get_job_details = (req,res) =>
{
    return Job.find({_id: req.body.job_id}).exec(function(err, result) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.json(result);
        }
    });
}

exports.sel_can = async (req,res) =>
{
    let job = await Job.find({_id: req.body.job_id})
    let job_doc = job[0]
    if (!('candidates_selected' in job_doc))
    {
        job_doc['candidates_selected'] = []
        job_doc.save()
    }

    if (job_doc.candidates_selected.indexOf(req.body.candidate_id) == -1)
    {
        job_doc.candidates_selected.push(req.body.candidate_id)
        job_doc.save()
    }

    let candidate = await Candidate.find({_id: req.body.candidate_id})
    let candidate_doc = candidate[0]
    if (!('jobsSelected' in candidate_doc))
    {
        candidate_doc['jobsSelected'] = []
        candidate_doc.save()
    }

    if (candidate_doc.jobsSelected.indexOf(req.body.job_id) == -1)
    {
        candidate_doc.jobsSelected.push(req.body.job_id)
        candidate_doc.save()
    }
    
    res.send(job_doc)
}


exports.rej_can = async (req,res) =>
{
    let job = await Job.find({_id: req.body.job_id})
    let job_doc = job[0]
    if (('candidates_selected' in job_doc))
    {
        if (job_doc.candidates_selected.indexOf(req.body.candidate_id) != -1)
        {
            job_doc.candidates_selected = job_doc.candidates_selected.filter((c) =>
            {
                return c != req.body.candidate_id
            })
            job_doc.save()
        }
    }

    

    let candidate = await Candidate.find({_id: req.body.candidate_id})
    let candidate_doc = candidate[0]
    if (('jobsSelected' in candidate_doc))
    {
        if (candidate_doc.jobsSelected.indexOf(req.body.job_id) != -1)
        {
            candidate_doc.jobsSelected = candidate_doc.jobsSelected.filter((j) =>
            {
                return j != req.body.job_id
            })
            candidate_doc.save()
        }
    }
    
    res.send(job_doc)
}