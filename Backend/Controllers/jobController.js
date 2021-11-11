const Job = require("../Models/JobSchema");

exports.getAllJobs = ()=> {

    return Job.find()
    .exec()
    .then((job) => {
        return res.json(job);
    })
    .catch(error=>{
        return {
            error: "No jobs Found " + error
        };
    })
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