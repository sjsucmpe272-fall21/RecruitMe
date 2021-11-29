const express = require("express");
const router = express.Router();

const { login, mailOTP } = require("../Controllers/loginController");
const { checkAuth } = require("../Utils/auth");

router.post("/login", login);
router.post("/mailOTP", mailOTP);

module.exports = router;