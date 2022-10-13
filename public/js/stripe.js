/*eslint-disable */
import { Stripe } from 'stripe';
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51Lq1phF6oLHorAFl8iLcgvTuj0z29nU6NBNvR0dUfaCIoB1zmZWCa31sVX89Q8tkuW0ZdYAvBEb8VifWWqnXHdBZ00BKQIwVVj'
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios(
      `/api/v1/bookings/create-checkout-session/${tourId}`
    );

    await stripe.redirectToCheckout({
      sessionId: session.data.session.Id,
    });
  } catch (error) {
    console.log(error.response.data);
    showAlert('error', error);
  }
};
