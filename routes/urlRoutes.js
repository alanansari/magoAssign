const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/authverify');
const urlController = require('../controller/urlController');
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000,
	max: 10,
	standardHeaders: true,
	legacyHeaders: false
});

router.get('/:urlId',urlController.redirectToSite);
router.post('/short',limiter,auth,urlController.generateShortUrl);

module.exports = router;