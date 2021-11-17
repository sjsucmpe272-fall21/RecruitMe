const express = require('express');
const router = express.Router();

const { logout } = require('../Controllers/logoutController');
const { checkAuth } = require('../Utils/auth');

router.post('/logout', logout);

module.exports = router;