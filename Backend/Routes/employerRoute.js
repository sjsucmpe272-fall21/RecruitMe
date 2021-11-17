const express = require("express");
const router = express.Router();
const { checkAuth } = require("../Utils/auth");

const{getEmployerProfile} = require("../Controllers/employerController")
const{select_candidate} = require("../Controllers/employerController")
const{reject_candidate} = require("../Controllers/employerController")

router.get("/employer", checkAuth, getEmployerProfile);
router.get("/select_candidate", checkAuth, select_candidate);
router.get("/reject_candidate", checkAuth, reject_candidate);

module.exports = router;