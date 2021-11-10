const express = require("express");
const router = express.Router();

const{getAllJobs} = require("../Controllers/jobController")

router.get("/jobs",getAllJobs);

module.exports = router;