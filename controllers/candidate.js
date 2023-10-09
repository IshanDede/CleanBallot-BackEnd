const Candidate = require("../models/Candidate").Candidate;

const addCandidate = async (req, res) => {
  const candidate = new Candidate(req.body);
  try {
    await candidate.save();
    res.json(candidate);
  } catch (err) {
    res.json(err.message);
  }
};

const getCandidates = async (req, res) => {
  try {
    res.json(await Candidate.find());
  } catch (err) {
    res.json(err.message);
  }
};

const getCandidate = async (req, res) => {
  const id = req.params.id;
  try {
    const candidate = await Candidate.findById(id);
    res.json(candidate);
  } catch (err) {
    res.json(err.message);
  }
};

const updateCandidate = async (req, res) => {
  const id = req.params.id;
  try {
    res.json(await Candidate.findByIdAndUpdate(id, req.body, { new: true }));
  } catch (err) {
    res.json(err.message);
  }
};
const overwriteCandidate = async (req, res) => {
  const id = req.params.id;
  const newCandidate = req.body;
  try {
    res.json(await Candidate.findOneAndReplace({ _id: id }, newCandidate));
  } catch (err) {
    res.json(err.message);
  }
};
const deleteCandidate = async (req, res) => {
  const id = req.params.id;
  try {
    res.json(await Candidate.findByIdAndDelete(id));
  } catch (err) {
    res.json(err.message);
  }
};

module.exports = {
  addCandidate,
  getCandidates,
  getCandidate,
  overwriteCandidate,
  updateCandidate,
  deleteCandidate,
};
