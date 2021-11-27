const express = require("express");
const router = express.Router();

const { uploadController } = require("../Controllers/uploadController");
const { upload } = require('../Controllers/uploadController');

router.post("/uploadFile", upload.array('photos', 5), uploadController);

module.exports = router;