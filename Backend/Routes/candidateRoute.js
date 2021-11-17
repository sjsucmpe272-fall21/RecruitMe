const express = require("express");
const router = express.Router();
const { checkAuth } = require("../Utils/auth");

const{apply_job} = require("../Controllers/candidateController")
const{withdraw_job,getCandidateProfile} = require("../Controllers/candidateController")


router.post("/apply_job", checkAuth, apply_job);
router.post("/withdraw_job", checkAuth, withdraw_job);
router.post("/candidate/profile", checkAuth, getCandidateProfile);

module.exports = router;