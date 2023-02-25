const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/users_controller');
const postController = require('../controllers/post_controller');
const commentController = require('../controllers/comment_controller');

router.get('/sign-in', userController.signUp);
router.get('/sign-up', userController.signIn);
router.get('/sign-out', userController.signOut);
router.get('/studentForm', passport.checkAuthentication, userController.studentForm);
router.get('/interviewForm', passport.checkAuthentication, userController.interviewForm);
router.get('/student-profile/:id', passport.checkAuthentication, userController.studentProfile);
router.get('/create-interview/:id',passport.checkAuthentication, userController.interviewProfile);
router.post('/create-interview', passport.checkAuthentication, userController.createInterview);
router.post('/create-student',passport.checkAuthentication, userController.createStudent);
router.post('/post', passport.checkAuthentication ,postController.createPost);
router.get('/post/delete/:id', passport.checkAuthentication,postController.delete);
router.post('/create-comment', passport.checkAuthentication, commentController.create);
router.get('/delete-comment/:id', passport.checkAuthentication, commentController.delete);
router.get('/profile/:id', passport.checkAuthentication,userController.profile);

module.exports = router;