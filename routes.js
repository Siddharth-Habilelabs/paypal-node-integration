const express = require('express');
const router = express.Router();
const paypalIntegration = require('./paypalIntegration'); // Adjust the path if needed

router.get('/', (req, res) => {
  res.send('Hello, PayPal Integration!');
});

router.get('/create-payment', (req, res) => {
  console.log("Received request for new payment using paypal.");

  const paymentData = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: `http://localhost:${process.env.PORT}/success`,
      cancel_url: `http://localhost:${process.env.PORT}/cancel`,
    },
    transactions: [{
      item_list: {
        items: [{
          name: 'Sample Item',
          sku: 'ITEM001',
          price: '10.00',
          currency: 'USD',
          quantity: 1,
        }],
      },
      amount: {
        total: '10.00',
        currency: 'USD',
      },
      description: 'Payment for Sample Item',
    }],
  };

  console.log("Payment process started.");

  paypalIntegration.createPayment(paymentData, (error, approvalUrl) => {
    if (error) {
      console.error(error.response);
      res.status(500).send('Internal Server Error');
    } else {
      // Redirect the user to the PayPal approval URL
      console.log("Redirecting to PayPal payment URL.");
      res.redirect(approvalUrl);
    }
  });
});

router.get('/success', (req, res) => {
  // Handle successful payment completion
  console.log("Payment successful.");
  res.send('Payment successful!');
});

router.get('/cancel', (req, res) => {
  // Handle payment cancellation
  console.log("Payment canceled.");
  res.send('Payment canceled.');
});

module.exports = router;
