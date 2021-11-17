const express = require("express");
const router = express.Router();

const{apply_job} = require("../Controllers/candidateController")
const{withdraw_job,getCandidateProfile,getJobs} = require("../Controllers/candidateController")

router.get("/getJobs",getJobs);
router.post("/apply_job",apply_job);
router.post("/withdraw_job",withdraw_job);
router.post("/candidate/profile",getCandidateProfile);

module.exports = router;