var mongoose = require("mongoose");
const CompanySchema = require("./CompanySchema");
const CandidateSchema = require("./CandidateSchema").schema

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
    }
      // candidatesApplied : [CandidateSchema],
      // candidatesSelected : [CandidateSchema]
    }
)

module.exports = mongoose.model("Job",jobSchema);