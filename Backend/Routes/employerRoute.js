const express = require("express");
const router = express.Router();

const{getEmployerProfile} = require("../Controllers/employerController")

router.get("/employer",getEmployerProfile);

module.exports = router;