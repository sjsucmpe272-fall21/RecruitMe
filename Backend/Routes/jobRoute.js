const express = require("express");
const router = express.Router();

const{getAllJobs} = require("../Controllers/jobController")
const{create_job} = require("../Controllers/jobController")
const{read_job} = require("../Controllers/jobController")
const{update_job} = require("../Controllers/jobController")
const{delete_job} = require("../Controllers/jobController");
const { checkAuth } = require("../Utils/auth");

router.get("/jobs", checkAuth, getAllJobs);
router.get("/read_job", checkAuth, create_job);
router.post("/create_job", checkAuth, create_job);
router.post("/update_job", checkAuth, update_job);
router.post("/delete_job", checkAuth, delete_job);

module.exports = router;