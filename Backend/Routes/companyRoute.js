const express = require("express");
const router = express.Router();
const { checkAuth } = require("../Utils/auth");

const{ getAllCompanies, getCompanyProfile } = require("../Controllers/companyController")

router.post("/getAllCompanies", getAllCompanies)
router.post("/companyProfile", getCompanyProfile);

module.exports = router;