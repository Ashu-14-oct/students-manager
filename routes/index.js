const express = require('express');
const passport = require('passport');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const userController = require('../controllers/users_controller');


router.get('/', homeController.home);
router.use('/user', require('./user'));
router.post('/create-user', userController.createUser);

//use passprt for auth
router.post('/create-session', passport.authenticate('local', {failureRedirect: '/user/sign-in'}) ,userController.createSession);



module.exports = router;