var express = require("express");
var router = express.Router();
const $publicKey = process.env.PUBLIC_KEY;
const $privateKey = process.env.PRIVATE_KEY;
const stripe = require("stripe")($privateKey);
/* GET home page. */
router.get("/ACH/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// affirm
router.get("/ACH/secret", async (req, res) => {
  const intent = await stripe.paymentIntents.create({
    payment_method_types: ["us_bank_account"],
    payment_method_data: {
      type: "us_bank_account",
    },
    confirm: true,
    amount: 5099,
    currency: "eur",
    return_url:
      "http://localhost:3000/order/stripeAffirmPayReturnUrl?is_invalid_token=1",
  }); // ... Fetch or create the PaymentIntent
  res.json({ client_secret: intent.client_secret, intent });
});
// affirm
router.post("/ACH/confirm", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.confirm(
    req.body.payment_intent,
    {
      payment_method: req.body.payment_method,
      return_url: req.body.return_url,
    }
  );
  res.json(paymentIntent);
});
// affirm
router.get("/ACH/affirm/secret2", async (req, res) => {
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

// card_present
// https://docs.stripe.com/terminal/payments/collect-card-payment
// {"client_secret":"pi_3PESYDAcQYdenBpw0Mw7jHff_secret_2xOFqzwbU1X8np6nQszaOrvLJ","intent":{"id":"pi_3PESYDAcQYdenBpw0Mw7jHff","object":"payment_intent","amount":1000,"amount_capturable":0,"amount_details":{"tip":{}},"amount_received":0,"application":null,"application_fee_amount":null,"automatic_payment_methods":null,"canceled_at":null,"cancellation_reason":null,"capture_method":"manual","client_secret":"pi_3PESYDAcQYdenBpw0Mw7jHff_secret_2xOFqzwbU1X8np6nQszaOrvLJ","confirmation_method":"automatic","created":1715244125,"currency":"usd","customer":null,"description":null,"invoice":null,"last_payment_error":null,"latest_charge":null,"livemode":true,"metadata":{},"next_action":null,"on_behalf_of":null,"payment_method":null,"payment_method_configuration_details":null,"payment_method_options":{"card_present":{"request_extended_authorization":false,"request_incremental_authorization_support":false}},"payment_method_types":["card_present"],"processing":null,"receipt_email":null,"review":null,"setup_future_usage":null,"shipping":null,"source":null,"statement_descriptor":null,"statement_descriptor_suffix":null,"status":"requires_payment_method","transfer_data":null,"transfer_group":null}}
router.get("/ACH/secret3", async (req, res) => {
  try {
    const intent = await stripe.paymentIntents.create({
      currency: "usd",
      payment_method_types: ["card_present"],
      capture_method: "manual",
      amount: 1000,
    }); // ... Fetch or create the PaymentIntent
    res.json({ client_secret: intent.client_secret, intent });
  } catch (error) {
    console.error(error);
    res.json(JSON.stringify(error));
  }
});

router.get("/ACH/readers", async (req, res) => {
  try {
    const readers = await stripe.terminal.readers.list({
      limit: 3,
    });
    res.json(readers);
  } catch (error) {
    console.error(error);
    res.json(JSON.stringify(error));
  }
});
router.get(
  "/process_payment_intent/:reader/:payment_intent",
  async (req, res) => {
    try {
      const reader = await stripe.terminal.readers.processPaymentIntent(
        req.params.reader,
        {
          payment_intent: req.params.payment_intent,
        }
      );
      res.json(reader);
    } catch (error) {
      console.error(error);
      res.json(JSON.stringify(error));
    }
  }
);

//新增客人
router.post("/ACH/customers", async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      ...req.body,
    });
    res.json(customer);
    // console.log(req.body);
  } catch (error) {
    console.error(error);
    res.json(JSON.stringify(error));
  }
});
//所有的顾客
router.get("/ACH/customers", async (req, res) => {
  try {
    const customers = await stripe.customers.list({
      limit: 100,
    });
    res.json(customers);
    // console.log(req.body);
  } catch (error) {
    console.error(error);
    res.json(JSON.stringify(error));
  }
});

//删除
router.delete("/ACH/customers/:id", async (req, res) => {
  try {
    const deleted = await stripe.customers.del(req.params.id);

    res.json(deleted);
    // console.log(req.body);
  } catch (error) {
    console.error(error);
    res.json(JSON.stringify(error));
  }
});

router.get("/ACH/checkout", function (req, res, next) {
  res.render("ACHCheckout", { title: "Express", $publicKey });
});
router.get("/ACH/checkout2", function (req, res, next) {
  res.render("ACHCheckout2", { title: "Express", $publicKey });
});
router.get("/ACH/retrieve", async function (req, res, next) {
  // payment_intent=pi_3P8ZrvEmZ3YgtBNv1YZGE2Dj&payment_intent_client_secret=pi_3P8ZrvEmZ3YgtBNv1YZGE2Dj_secret_mscSkoEGETzZvHTCBKANUgzzM
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      req.query.payment_intent,
      {
        client_secret: req.query.payment_intent_client_secret,
      }
    );
    res.json({ ...paymentIntent });
  } catch (error) {
    res.json({ ...error });
  }
  // res.render("checkout2", { title: "Express", $publicKey });
});
router.get("/ACH/payment_methods/:id", async function (req, res, next) {
  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(req.params.id);
    res.json({ ...paymentMethod });
  } catch (error) {
    res.json({ ...error });
  }
  // res.render("checkout2", { title: "Express", $publicKey });
});
router.post("/ACH/create-intent", async (req, res) => {
  const intent = await stripe.paymentIntents.create({
    // To allow saving and retrieving payment methods, provide the Customer ID.
    customer: 'cus_SwX1z4RawKC9ZL',
    amount: 1099,
    currency: "usd",
    payment_method_types: ["us_bank_account"],
  });
  res.json({ client_secret: intent.client_secret });
});
module.exports = router;
