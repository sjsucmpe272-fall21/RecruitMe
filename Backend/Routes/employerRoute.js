const express = require("express");
const router = express.Router();

const{getEmployerProfile} = require("../Controllers/employerController")
const{select_candidate} = require("../Controllers/employerController")
const{reject_candidate} = require("../Controllers/employerController")

router.get("/employer",getEmployerProfile);
router.get("/select_candidate",select_candidate);
router.get("/reject_candidate",reject_candidate);

module.exports = router;