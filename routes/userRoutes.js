const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/authverify');
const userController = require('../controller/userController');

router.get('/test',userController.test);
router.get('/myurls',auth,userController.myurls);
router.post('/login',userController.login);

router.post('/email',userController.email);
router.post('/signup',userController.signup);

module.exports = router;