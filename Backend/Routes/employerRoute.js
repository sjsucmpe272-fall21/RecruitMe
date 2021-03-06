const express = require("express");
const router = express.Router();
const { checkAuth } = require("../Utils/auth");

const{ getCandidates,getEmployerProfile, select_candidate, reject_candidate, get_jobs, get_company, get_applied_candidates, get_selected_candidates, get_company_fromid, createNewJob } = require("../Controllers/employerController")

router.post("/employer", getEmployerProfile);
router.post("/getCandidates",getCandidates)
router.get("/select_candidate", checkAuth, select_candidate);
router.get("/reject_candidate", checkAuth, reject_candidate);
router.post("/emp_jobs",get_jobs);
router.post("/emp_company",get_company)
router.post("/emp_company_fromid",get_company_fromid)
router.post("/applied_candidates",get_applied_candidates)
router.post("/selected_candidates",get_selected_candidates)
router.post("/createNewJob", createNewJob);

module.exports = router;