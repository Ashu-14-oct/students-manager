const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const userController = require('../controllers/users_controller');


router.get('/', homeController.home);
router.use('/user', require('./user'));
router.post('/create-user', userController.createUser);
router.post('/create-session', userController.createSession);



module.exports = router;