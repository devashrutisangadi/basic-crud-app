var mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  uname: String,
  ugender: String,
  umobile: Number,
});

var userModel = mongoose.model("user", userSchema);
module.exports = userModel;
