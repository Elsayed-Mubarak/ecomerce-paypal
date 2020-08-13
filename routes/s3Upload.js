var express = require('express');
var router = express.Router();
let upload = require('../config/multer.config');
const awsWorker = require("../controller/awsS3Uploade")

router.post('/file/upload', upload.single("file"), awsWorker.uploadFile);


module.exports = router;
