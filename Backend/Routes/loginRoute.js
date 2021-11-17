const express = require("express");
const router = express.Router();

const { login } = require("../Controllers/loginController");
const { checkAuth } = require("../Utils/auth");

router.post("/login", login);

module.exports = router;