const Candidate = require("../Models/CandidateSchema");
const Job = require("../Models/JobSchema");
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

exports.getCandidateProfile = ()=> {
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
            const job = [];
            job.push(
                data.description.length,
                data.descriptionHTML.length,
                `Description='${data.description}'`,
                `Query='${data.query}'`,
                `Location='${data.location}'`,
                `Id='${data.jobId}'`,
                `Title='${data.title}'`,
                `Company='${data.company ? data.company : "N/A"}'`,
                `Place='${data.place}'`,
                `Date='${data.date}'`,
                `Link='${data.link}'`,
                `applyLink='${data.applyLink ? data.applyLink : "N/A"}'`,
                `senorityLevel='${data.senorityLevel}'`,
                `function='${data.jobFunction}'`,
                `employmentType='${data.employmentType}'`,
                `industries='${data.industries}'`,
            );
            jobs.push(job);
        });
    
        scraper.on(events.scraper.error, (err) => {
            console.error(err);
        });
    
        scraper.on(events.scraper.end, () => {
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
                },
                {
                    query: "Sales",
                    options: {                    
                        limit: 2, // This will override global option limit (33)
                    }
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