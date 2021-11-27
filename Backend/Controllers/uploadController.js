const express = require('express');
const app = express.Router();

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const s3 = require('../Utils/initializeS3.js');
const multerS3 = require('multer-s3');

const upload = multer({
    storage: multerS3({
        acl: 'public-read',
        s3: s3,
        bucket: 'recruit-me',
        key: function (req, file, cb) {
            cb(null, file.originalname);
      }
    })
})

uploadController = (req, res) => {
    console.log('uploadFile to s3 ', req.body);
    res.end();
}

module.exports = {
    upload: upload,
    uploadController: uploadController,
};