const mongoose = require("mongoose");

const candidateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  candidatePhoto: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  party: {
    type: String,
    required: true,
  },
  partyPhoto: {
    type: String,
    required: true,
  },
  manifesto: {
    type: String,
    required: true,
  },
  voteCount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

exports.Candidate = mongoose.model("Candidate", candidateSchema);
