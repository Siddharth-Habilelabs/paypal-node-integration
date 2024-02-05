require('dotenv').config();
const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox', // Set to 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

// Function to create a PayPal payment
const createPayment = (paymentData, callback) => {
  paypal.payment.create(paymentData, (error, payment) => {
    if (error) {
      callback(error, null);
    } else {
      // Extract the approval URL from the payment response
      const approvalUrl = payment.links.find(link => link.rel === 'approval_url').href;
      callback(null, approvalUrl);
    }
  });
};

module.exports = {
  createPayment,
};
