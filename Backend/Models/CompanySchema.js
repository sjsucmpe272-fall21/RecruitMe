var mongoose = require("mongoose");

var companySchema = new mongoose.Schema(
    {
      name: {
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
      phone: {
        type: Number,
        required: true
      },
      address: new mongoose.Schema(
        {
          street_address: {
            type: String,
            required: true,
            maxlength: 100,
            trim: true
          },
          city: {
            type: String,
            required: true,
            maxlength: 40,
            trim: true
          },
          state: {
            type: String,
            required: true,
            maxlength: 40,
            trim: true
          },
          country: {
            type: String,
            required: true,
            maxlength: 40,
            trim: true
          },
          pincode: {
            type: Number,
            // required: true,
            min: 0, 
            max: 6
          },
        }
      ),
      description: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
      },
      industries: {
        type: [Array],
        required: true,
      },
      encry_password: {
        type: String,
        required: true
      }
    }
)

module.exports = mongoose.model("Company",companySchema);