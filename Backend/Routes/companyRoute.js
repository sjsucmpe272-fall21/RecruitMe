const express = require("express");
const router = express.Router();
const { checkAuth } = require("../Utils/auth");

const{ getAllCompanies } = require("../Controllers/companyController")

router.post("/getAllCompanies", getAllCompanies)

module.exports = router;