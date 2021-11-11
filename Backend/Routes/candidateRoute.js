const express = require("express");
const router = express.Router();

const{apply_job} = require("../Controllers/candidateController")
const{withdraw_job} = require("../Controllers/candidateController")


router.post("/apply_job",apply_job);
router.post("/withdraw_job",withdraw_job);


module.exports = router;