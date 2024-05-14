var express = require("express");
var router = express.Router();
const $publicKey = process.env.PUBLIC_KEY;
const $privateKey = process.env.PRIVATE_KEY;
const stripe = require("stripe")($privateKey);
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/stripe/secret2", async (req, res) => {
  try {
    const intent = await stripe.paymentIntents.create({
      amount: 6000,
      currency: "usd",
      payment_method_types: ["affirm"],
      payment_method_data: {
        type: "affirm",
      },
      confirm: true,
      return_url:
        "http://localhost:3000/order/stripeAffirmPayReturnUrl?is_invalid_token=1",
      // automatic_payment_methods: {
      //   enabled: true,
      // },
    }); // ... Fetch or create the PaymentIntent
    res.json({ client_secret: intent.client_secret, intent });
  } catch (error) {
    res.json(JSON.stringify(error));
  }
});
// Create a PaymentMethod
router.get("/stripe/v1/payment_methods/:customer", async (req, res) => {
  try {
    const _paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: "4000000000000101",
        exp_month: 8,
        exp_year: 2026,
        cvc: "314",
      },
    });
    if (req.params.customer) {
      const paymentMethod = await stripe.paymentMethods.attach(
        _paymentMethod.id,
        {
          customer: req.params.customer,
        }
      );
      res.json(paymentMethod);
    } else {
      res.json(_paymentMethod);
    }
  } catch (error) {
    res.json(JSON.stringify(error));
  }
});

router.get(
  "/stripe/pay/:payment_method_id/:customer/:price",
  async (req, res) => {
    console.log(req.params.payment_method_id, req.params.price);
    function generateResponse(response, intent) {
      if (intent.status === "succeeded") {
        // Handle post-payment fulfillment
        return response.send({ success: true });
      } else {
        // Any other status would be unexpected, so error
        return response
          .status(500)
          .send({ error: "Unexpected status " + intent.status });
      }
    }
    try {
      // Create the PaymentIntent
      let intent = await stripe.paymentIntents.create({
        amount: req.params.price || 100,
        currency: "usd",
        payment_method: req.params.payment_method_id,
        return_url: "http://localhost:9000/checkout",
        customer: req.params.customer,

        // A PaymentIntent can be confirmed some time after creation,
        // but here we want to confirm (collect payment) immediately.
        confirm: true,
        capture_method: "manual",

        // If the payment requires any follow-up actions from the
        // customer, like two-factor authentication, Stripe will error
        // and you will need to prompt them for a new payment method.>
        // error_on_requires_action: true,
      });
      // console.log(intent);
      res.json(intent);
      // return generateResponse(res, intent);
    } catch (error) {
      console.error(error);
      res.json(JSON.stringify(error));
    }
  }
);

router.get("/stripe/v1/payment_intents/:id", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);

    res.json(paymentIntent);
    // return generateResponse(res, intent);
  } catch (error) {
    console.error(error);
    res.json(JSON.stringify(error));
  }
});

router.get("/stripe/v1/customers/:id/payment_methods", async (req, res) => {
  try {
    const paymentMethods = await stripe.customers.listPaymentMethods(
      req.params.id
    );

    res.json(paymentMethods);
    // return generateResponse(res, intent);
  } catch (error) {
    console.error(error);
    res.json(JSON.stringify(error));
  }
});

// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// const paymentIntent = await stripe.paymentIntents.retrieve(
//   'pi_3MtwBwLkdIwHu7ix28a3tqPa'
// );
module.exports = router;
