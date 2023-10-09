const {
  addCandidate,
  getCandidates,
  getCandidate,
  overwriteCandidate,
  updateCandidate,
  deleteCandidate,
} = require("../controllers");

const router = require("express").Router();

router
  .post("/candidates", addCandidate)

  .get("/candidates", getCandidates)

  .get("/candidates/:id", getCandidate)

  .put("/candidates/:id", overwriteCandidate)

  .patch("/candidates/:id", updateCandidate)

  .delete("/candidates/:id", deleteCandidate);

module.exports = router;
