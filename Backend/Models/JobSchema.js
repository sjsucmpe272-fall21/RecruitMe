var mongoose = require("mongoose");
const CompanySchema = require("./CompanySchema");
const CandidateSchema = require("./CandidateSchema")

var jobSchema = new mongoose.Schema(
    {
      _id: {
        type: String
      },
      name: {
        type: String,
        // required: true,
        maxlength: 100,
        trim: true
      },
      jobType: {
        type: String,
        // required: true,
        maxlength: 100,
        trim: true
      },
      jobDescription: {
        type: String,
        // // required: true,
        // maxlength: 100,
        trim: true
      },
      company: {
        type: String
      },
      jobLocation:{
          type: String,
          maxlength: 1000,
          trim: true
      },
      senorityLevel:{
        type: String,
        maxlength: 500,
        trim: true
    },
    applyLink:{
      type:String
    },
    jobFunction:{
      type:String,
      trim: true
    },
    industries:{
      type:String,
      trim: true
      // maxLength: 50
    },
    dateposted:{
      type: String
    },
    jobLink:{
      type: String
    },
    formattedData:{
      type:String
    },
    candidates_applied: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate'
      }],
    candidates_selected: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate'
      }]
    }
)

module.exports = mongoose.model("Job",jobSchema);