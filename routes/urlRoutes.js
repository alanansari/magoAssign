const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/authverify');
const urlController = require('../controller/urlController');

router.get('/:urlId',urlController.see);
router.post('/short',auth,urlController.short);

module.exports = router;