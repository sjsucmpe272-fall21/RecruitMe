const Candidate = require("../Models/CandidateSchema");
const Job = require("../Models/JobSchema");
const FormattedJobData = require("../Models/FormattedJobData");
 const client = require('../elasticsearch/connection');
const { 
    LinkedinScraper,
    relevanceFilter,
    timeFilter,
    typeFilter,
    experienceLevelFilter,
    events,
} = require("linkedin-jobs-scraper");
const request = require('request')
const express = require("express");
const app = express()

exports.apply_job = (req,res) =>
{
    Job.findById(req.body.job_id, (err,doc) => 
    {
        if (err)
        {
            res.send("Job not found.")
        }
        else
        {
            doc.candidatesApplied.push(req.body.candidate_id)
            doc.save()
        }
    })
}

exports.withdraw_job = (req,res) =>
{
    Job.findById(req.body.job_id, (err,doc) => 
    {
        if (err)
        {
            res.send("Job not found.")
        }
        else
        {
            const index = doc.candidatesApplied.indexOf(req.body.candidate_id)
            if (index > -1)
            {
                doc.candidatesApplied.splice(index)
                doc.save()
            }
        }
    })
}

exports.getCandidateProfile = (req)=> {
    var candidateId = req.body.candidateId;

    return Candidate.find({_id: candidateId})
    .exec()
    .then((candidate) => {
        return res.json(candidate);
    })
    .catch(error=>{
        return {
            error: "No candidate Found "+error
        };
    })
}

exports.getJobs = (req,res)=>{
    const formattedJobs = [];
    const jobs = [];
    (async () => {
        // Each scraper instance is associated with one browser.
        // Concurrent queries will run on different pages within the same browser instance.
        const scraper = new LinkedinScraper({
            headless: true,
            slowMo: 100,
            args: [
                "--lang=en-GB",
            ],
        });
    
        // Add listeners for scraper events
        scraper.on(events.scraper.data, async (data) => {
            let url = data.link;
            let job = {};
            let formattedJob = {};
            formattedJob = {
                "_id":data.jobId,
                "formattedData": data.description+data.query+data.location+data.senorityLevel+data.employmentType+data.industries
            }
            job = {
                // data.description.length,
                // data.descriptionHTML.length,
                "jobDescription" : data.description,
                "jobType" : data.query,
                "jobLocation":data.location,
                "name":data.title,
                "company":data.company ? data.company : "N/A",
                "dateposted":data.date,
                "jobLink":data.link,
                "applyLink":data.applyLink ? data.applyLink : "N/A",
                "senorityLevel":data.senorityLevel,
                "jobFunction":data.jobFunction,
                "jobType":data.employmentType,
                "industries":data.industries,
                "candidates_applied": []
            };
            
            await client.index({ 
                index: 'jobs',
                id: data.jobId,
                body: job
            })
            .then(()=>{
                console.log("Inserted into elastic search successfully");
            })
            .catch((err)=>{
                console.log("Inserted into elastic search Failed "+err);
            })

            job._id = data.jobId;
            jobs.push(job);
            formattedJobs.push(formattedJob);

        });
    
        scraper.on(events.scraper.error, (err) => {
            console.error(err);
        });
    
        scraper.on(events.scraper.end, () => {
           
            jobs.forEach((n)=>{
                Job.findOneAndUpdate(n,n, { upsert: true },(err,job)=>{
                    if(err)
                    {
                        console.log(err)
                        return;
                    }
                    
                    console.log("Data inserted")  
                })
            })
            
            formattedJobs.forEach((n)=>{
                FormattedJobData.findOneAndUpdate(n,n, { upsert: true },(err,job)=>{
                    if(err)
                    {
                        console.log(err)
                        return;
                    }
                    
                    console.log("Formatted Data inserted")  
                })
            })
            
            console.log('All done!');
            return res.json(jobs);
        });
    
        // Add listeners for puppeteer browser events
        scraper.on(events.puppeteer.browser.targetcreated, () => {
        });
        scraper.on(events.puppeteer.browser.targetchanged, () => {
        });
        scraper.on(events.puppeteer.browser.targetdestroyed, () => {
        });
        scraper.on(events.puppeteer.browser.disconnected, () => {
        });
    
        // Custom function executed on browser side to extract job description
        const descriptionFn = () => document.querySelector(".description__text")
            .innerText
            .replace(/[\s\n\r]+/g, " ")
            .trim();
        
        
        // Run queries concurrently    
        await Promise.all([
            // Run queries serially
            scraper.run([
                {
                    query: "Engineer",
                    options: {
                        locations: ["United States"], // This will be merged with the global options => ["United States", "Europe"]
                        filters: {
                            type: [typeFilter.FULL_TIME, typeFilter.CONTRACT]    
                        },       
                    }                                                    
                // },
                // {
                //     query: "Sales",
                //     options: {                    
                //         limit: 2, // This will override global option limit (33)
                //     }
                },
            ], { // Global options for this run, will be merged individually with each query options (if any)
                locations: ["Europe"],
                optimize: true,
                limit: 3,
            }),
        ]);
    
        // Close browser
        await scraper.close();
    })();
}

exports.getSuitableJobs = async (req,res)=>{
    await client.search({
        index: 'jobs',
        body: {
          query: {
            match: {
                jobDescription: 'Electronics engineer'
            }
          }
        }
      })
      .then((resp)=>{
          return res.json(resp);
      })
      .catch((err)=>{
          console.log("ERROR IS "+err);
      })
}

exports.getSimilarJobs = async (req,res)=>{
    await client.search({
        index: 'jobs',
        body: {
          query: {
            more_like_this:{
                fields: ["jobDescription"],
                like: [{"_id":req.body.job_id}],
                min_term_freq : 1,
                min_doc_freq : 5,
                max_query_terms: 20 
            }
          }
        }
      })
      .then((resp)=>{
          return res.json(resp);
      })
      .catch((err)=>{
          console.log("ERROR IS "+err);
      })
}


exports.getcandidateprof = async (req,res) =>
{
    return Candidate.find({_id: req.body.candidate_id}).exec(function(err, models) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.json(models);
        }
    });
}
const queryString = (ctx)=>{
    if (ctx._source.candidates_applied==null)
        return " ctx._source.candidates_applied = new ArrayList(); ctx._source.candidates_applied.add(1234);"
    else
        return "ctx._source.candidates_applied.add(1234);"
}
// Use this api to apply for a job
// Pass body as {'candidate_id':value,'job_id':value}
// This api can be accessed as /api/job_apply url
exports.job_apply = async (req,res) =>
{
    try
    {
        let job = await Job.find({_id: req.body.job_id})
        let job_doc = job[0]
        if (!('candidates_applied' in job_doc))
        {
            job_doc['candidates_applied'] = []
            job_doc.save()
        }

        if (job_doc.candidates_applied.indexOf(req.body.candidate_id) == -1)
        {
            job_doc.candidates_applied.push(req.body.candidate_id)
            job_doc.save()
        }

        let candidate = await Candidate.find({_id: req.body.candidate_id})
        let candidate_doc = candidate[0]
        if (!('jobsAppliedTo' in candidate_doc))
        {
            candidate_doc['jobsAppliedTo'] = []
            candidate_doc.save()
        }

        if (candidate_doc.jobsAppliedTo.indexOf(req.body.job_id) == -1)
        {
            candidate_doc.jobsAppliedTo.push(req.body.job_id)
            candidate_doc.save()
        }

        
        client.updateByQuery({
            index: "jobs",
            body:{
            query: {
                terms: {
                  _id: [ req.body.job_id ] 
                }
              },
              script:{
                lang: "painless",
                source: "if(ctx._source.candidates_applied.indexOf(1234)==-1)ctx._source.candidates_applied.add(1234)"
              }
            }
        })
        .then(
            function(resp) {
                console.log("Successful update! The response was: ", resp);
            },
            function(err) {
                console.trace(err.message);
            }
        );
        res.send(candidate)
    }
    catch(error)
    {
        res.send("error is: "+error);
    }
    
}