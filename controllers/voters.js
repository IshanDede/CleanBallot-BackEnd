const Voter = require("../models/Voter").Voter;

const addVoter = async (req, res) => {
  const voter = new Voter(req.body);
  try {
    await voter.save();
    res.json(voter);
  } catch (err) {
    res.json(err.message);
  }
};

const getVoters = async (req, res) => {
  try {
    res.json(await Voter.find());
  } catch (err) {
    res.json(err.message);
  }
};

const getVoter = async (req, res) => {
  const id = req.params.id;
  try {
    const voter = await Voter.findById(id);
    res.json(voter);
  } catch (err) {
    res.json(err.message);
  }
};

const updateVoter = async (req, res) => {
  const id = req.params.id;
  try {
    res.json(await Voter.findByIdAndUpdate(id, req.body, { new: true }));
  } catch (err) {
    res.json(err.message);
  }
};
const overwriteVoter = async (req, res) => {
  const id = req.params.id;
  const newVoter = req.body;
  try {
    res.json(await Voter.findOneAndReplace({ _id: id }, newVoter));
  } catch (err) {
    res.json(err.message);
  }
};
const deleteVoter = async (req, res) => {
  const id = req.params.id;
  try {
    res.json(await Voter.findByIdAndDelete(id));
  } catch (err) {
    res.json(err.message);
  }
};

module.exports = {
  addVoter,
  getVoters,
  getVoter,
  overwriteVoter,
  updateVoter,
  deleteVoter,
};
