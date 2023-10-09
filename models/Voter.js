const mongoose = require("mongoose");

const voterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "not voted",
  },
});

exports.Voter = mongoose.model("Voter", voterSchema);
