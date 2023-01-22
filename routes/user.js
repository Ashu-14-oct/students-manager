const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');


router.get('/sign-in', userController.signUp);
router.get('/sign-up', userController.signIn);


module.exports = router;