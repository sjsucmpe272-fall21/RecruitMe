var mongoose = require("mongoose");
const crypto = require('crypto');
const { v1: uuidv1 } = require("uuid");

var employerSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
      },
      lastName: {
        type: String,
        maxlength: 32,
        trim: true
      },
       email: {
        type: String,
        trim: true,
        required: true,
        unique: true
      },
      company: {
        type: String
      },
      encry_password: {
        type: String,
        required: true
      },
      salt: String,
      role: {
        type: Number,
        default: 0
      }
    }
)

employerSchema.virtual('fullName').
  get(function() {
    return this.firstName + ' ' + this.lastName;
   }).
  set(function(v) {
    this.firstName = v.substr(0, v.indexOf(' '));
    this.lastName = v.substr(v.indexOf(' ') + 1);
  });

  employerSchema.virtual('password').
  set(function(password){
    this._password=password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password)
  })
  .get(function(){
    return this._password;
  })
  employerSchema.methods = {
  securePassword: function(plainpassword){
    if(plainpassword=="")
      return "";
    try {
      const secret = this.salt;
      return crypto.createHmac('sha256', secret)
                   .update(plainpassword)
                   .digest('hex');
    } catch (error) {
      return "";
    }
  },
  authenticate: function(plainpassword){
      return this.securePassword(plainpassword)===this.encry_password;
  }
}

module.exports = mongoose.model("Employer",employerSchema);