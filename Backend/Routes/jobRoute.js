const express = require("express");
const router = express.Router();

const{getAllJobs} = require("../Controllers/jobController")
const{create_job} = require("../Controllers/jobController")
const{read_job} = require("../Controllers/jobController")
const{update_job} = require("../Controllers/jobController")
const{delete_job} = require("../Controllers/jobController")

router.get("/jobs",getAllJobs);
router.get("/read_job",create_job);
router.post("/create_job",create_job);
router.post("/update_job",update_job);
router.post("/delete_job",delete_job);

module.exports = router;