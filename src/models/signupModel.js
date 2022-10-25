const mongoose = require("mongoose")

const signupSchema = mongoose.Schema({
    username: String,
    password: String
  });


module.exports = signupModel = mongoose.model("SignupDetails", signupSchema)