var mongoose = require("mongoose");

var companySchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
      },
      description: {
        type: String,
        maxlength: 1000,
      }
    }
)

module.exports = mongoose.model("Company",companySchema);