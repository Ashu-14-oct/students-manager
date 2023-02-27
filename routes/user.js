const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/users_controller');

router.get('/sign-in', userController.signUp);
router.get('/sign-up', userController.signIn);
router.get('/download', passport.checkAuthentication, userController.download);
router.get('/sign-out', userController.signOut);
router.get('/studentForm', passport.checkAuthentication, userController.studentForm);
router.get('/interviewForm', passport.checkAuthentication, userController.interviewForm);
router.get('/student-profile/:id', passport.checkAuthentication, userController.studentProfile);
router.get('/create-interview/:id',passport.checkAuthentication, userController.interviewProfile);
router.post('/create-interview', passport.checkAuthentication, userController.createInterview);
router.post('/create-student',passport.checkAuthentication, userController.createStudent);
router.get('/profile/:id', passport.checkAuthentication,userController.profile);

module.exports = router;