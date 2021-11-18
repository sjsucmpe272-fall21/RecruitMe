var mongoose = require("mongoose");


var formattedJobSchema = new mongoose.Schema(
    {
        _id: {
            type: String
        },
        formattedData:{
            type:String
        }
    }
)

module.exports = mongoose.model("FormattedJobData",formattedJobSchema);