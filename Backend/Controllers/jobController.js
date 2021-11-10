const Job = require("../Models/JobSchema");

exports.getAllJobs = ()=> {

    return Job.find()
    .exec()
    .then((job) => {
        return res.json(job);
    })
    .catch(error=>{
        return {
            error: "No jobs Found "+error
        };
    })
}