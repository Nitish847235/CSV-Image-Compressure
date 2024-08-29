const express = require("express");
const { uploadCsv } = require("../controller/uploadController");
const { getStatus } = require("../controller/statusController");
const multer = require("multer");
const detectRequestType = require("../middleware/detectRequestType");

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload',detectRequestType,upload.single('file'), uploadCsv);
router.get('/status/:requestId',detectRequestType, getStatus);


module.exports = router;