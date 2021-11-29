const express = require("express");
const router = express.Router();
const { checkAuth } = require("../Utils/auth");

const{getSimilarJobs,withdraw_job,getCandidateProfile,getJobs,job_apply,apply_job,getSuitableJobs,getcandidateprof, applyFilters} = require("../Controllers/candidateController")
//const{getSimilarJobs} = require("../Controllers/TFIDF")

router.post("/getSuitableJobs",  getSuitableJobs);
router.post("/getSimilarJobs",  getSimilarJobs);
router.get("/getJobs",  getJobs);
router.post("/apply_job", checkAuth, apply_job);
router.post("/withdraw_job", checkAuth, withdraw_job);
router.post("/candidate/profile", getCandidateProfile);
router.post("/candidate/prof", getcandidateprof);
router.post("/job_apply", job_apply);
router.post("/applyFilters", applyFilters);

module.exports = router;