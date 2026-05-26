const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// POST /upload-report
router.post('/upload-report', reportController.getPresignedUrl);

module.exports = router;