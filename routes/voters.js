const {
  addVoter,
  getVoters,
  getVoter,
  overwriteVoter,
  updateVoter,
  deleteVoter,
} = require("../controllers");
const { casteVote } = require("../controllers/castvote");

const router = require("express").Router();

router
  .post("/voters", addVoter)

  .get("/voters", getVoters)

  .get("/voters/:id", getVoter)

  .put("/voters/:id", overwriteVoter)

  .patch("/voters/:id", updateVoter)

  .delete("/voters/:id", deleteVoter)
  
  .post("/cast-vote", casteVote);

module.exports = router;
