const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const bookingRouter = require('./bookingRoutes');

const router = express.Router({ mergeParams: true });

router.post('/signup', authController.signup);

router.get('/verify-email', authController.verifyEmail);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);

router.patch('/resetPassword/:token', authController.resetPassword);

// router.use(authController.protect);
// The above is another way to protect URLs insead of putting .protect in all the functons below.
// Middleware runs in sequence. So from this router.use downwards, this above middleware protects it and users must logi in to access them.

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router
  .route('/me')
  .get(authController.protect, userController.getMe, userController.getUser);

router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  authController.protect,
  userController.updateMe
);

router.delete('/deleteMe', authController.protect, userController.deleteMe);

// router.use(authController.restrictTo('admin');
// The above is another way to protect URLs accessible to only admins insead of putting .restrictTo in all the functons below.
// Middleware runs in sequence. So from this router.use downwards, this above middleware protects it and users must logi in to access them.

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    userController.getAllUsers
  )
  .post(userController.createUser);

router
  .route('/:id')
  .get(
    authController.protect,
    // authController.restrictTo('admin', 'lead-guide'),
    userController.getUser
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser
  );

router.use('/:userId/bookings', bookingRouter);

module.exports = router;
