var mongoose = require("mongoose");
// const JobSchema = require("./JobSchema")

var candidateSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
      },
      lastName: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
      },
      email: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
      },
      phoneNumber: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
      },
      streetAddress: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
      },
      city: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
      },
      state: {
        type: String,
        required: true,
        maxlength: 100
      },
      country: {
        type: String,
        required: true,
        maxlength: 100
      },
      postalCode:{
          type: Number,
          maxlength: 50,
          trim: true
      },
      jobsAppliedTo: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
      }]
    }
)

module.exports = mongoose.model("Candidate",candidateSchema);