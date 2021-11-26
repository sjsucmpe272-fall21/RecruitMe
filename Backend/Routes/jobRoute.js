const express = require("express");
const router = express.Router();

const{ getAllJobs, get_job_details, create_job, read_job, update_job, delete_job, sel_can, rej_can } = require("../Controllers/jobController")
const { checkAuth } = require("../Utils/auth");

router.get("/jobs", getAllJobs);
router.get("/read_job", read_job);
router.post("/job_details",get_job_details)
router.post("/create_job", create_job);
router.post("/update_job", update_job);
router.post("/delete_job", delete_job);
router.post("/sel_can", sel_can);
router.post("/rej_can", rej_can);

module.exports = router;