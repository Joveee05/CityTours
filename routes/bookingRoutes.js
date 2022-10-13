const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.get(
  '/create-checkout-session/:tourId',
  authController.protect,
  bookingController.getCheckoutSession
);

router
  .route('/')
  .get(authController.protect, bookingController.getAllBookings)
  .post(authController.protect, bookingController.createBooking);

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    bookingController.getBooking
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    bookingController.updateBooking
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    bookingController.deleteBooking
  );

module.exports = router;
