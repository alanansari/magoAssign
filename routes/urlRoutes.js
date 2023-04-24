const express = require('express');
const router = express.Router();

router.post('/create',authverify,urlController.create);

module.exports = router;