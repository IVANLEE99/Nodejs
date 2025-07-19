var express = require("express");
const axios = require('axios');
var router = express.Router();
const $publicKey = process.env.PUBLIC_KEY;
const $privateKey = process.env.PRIVATE_KEY;
const stripe = require("stripe")($privateKey);
const getAccessToken = require("../middlewares/getAccessToken.js");
/* GET home page. */
router.get("/Klarna/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// affirm
router.get("/Klarna/secret", getAccessToken, async (req, res) => {
  // const intent = await stripe.paymentIntents.create({
  //   payment_method_types: ['klarna'],
  //   payment_method_data: {
  //     type: "klarna",
  //     billing_details: {
  //       email: 'customer@example.com',
  //       address: {
  //         country: 'US',
  //       },
  //     },
  //   },
  //   confirm: true,
  //   amount: 5099,
  //   currency: 'usd',
  //   return_url:
  //   "http://localhost:3000/order/stripeAffirmPayReturnUrl?is_invalid_token=1",
  // }); // ... Fetch or create the PaymentIntent
  // res.json({ client_secret: intent.client_secret, intent });


  let time = new Date().getTime()
  const requestBody = {
    "request_id": time,
    "merchant_order_id": time,
    "amount": 100.01,
    "currency": "EUR",
    "order": {
      "products": [
        {
          "category": "Apparel and accessories",
          "code": "3414314111",
          "desc": "IPHONE 7",
          "effective_end_at": "2020-12-31T23:59:59Z",
          "effective_start_at": "2020-01-01T00:00:00Z",
          "image_url": "https://example.airwallex.com/product/12345.png",
          "name": "IPHONE7",
          "quantity": 5,
          "seller": {
            "identifier": "string",
            "name": "string"
          },
          "sku": "100004",
          "type": "physical",
          "unit_price": 100.01,
          "url": "https://example.airwallex.com/product/12345"
        }
      ],
      "shipping": {
        "first_name": "John",
        "last_name": "Shooper",
        "phone_number": "+491713920016",
        "address": {
          "country_code": "DE",
          "city": "Berlin",
          "postcode": "546080",
          "street": "16 Sandilands Road"
        }
      }
    },
    return_url: 'http://localhost:9000/klarna/checkout'

  };

  axios
    .request({
      url: 'https://api-demo.airwallex.com/api/v1/pa/payment_intents/create',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.__Authorization,
      },
      data: requestBody,
    })
    .then(({ data }) => {
      // console.log(data)
      res.json(data)
    })
    .catch(error => { console.error(error) });

});
// affirm
router.post("/Klarna/confirm/:payment_intent", getAccessToken, async (req, res) => {
  let time = new Date().getTime()
  const requestBody = {
    "request_id": time,
    "payment_method": {
      "type": "klarna",
      "klarna": {
        "country_code": "DE",
        "language": "en",
        "billing": {
          "date_of_birth": "2011-10-12",
          "email": "customer@email.de",
          "first_name": "John",
          "last_name": "Shopper",
          "phone_number": "+491713920016",
          "address": {
            "country_code": "DE",
            "city": "Berlin",
            "street": "Neue Schönhauser St",
            "postcode": "10178"
          }
        }
      }
    },
    "payment_method_options": {
      "klarna": {
        "auto_capture": false
      }
    }
  }
  axios
    .request({
      url: `https://api-demo.airwallex.com/api/v1/pa/payment_intents/${req.params.payment_intent}/confirm`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.__Authorization,
      },
      data: requestBody,
    })
    .then(({ data }) => { res.json(data) })
    .catch(error => {
      console.error(error)
      res.json(error)
    });
  // res.json(paymentIntent);
});
router.get("/Klarna/retrieve/:payment_intent", getAccessToken, async (req, res) => {
  axios
    .request({
      url: `https://api-demo.airwallex.com/api/v1/pa/payment_intents/${req.params.payment_intent}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.__Authorization,
      },
    })
    .then(({ data }) => { res.json(data) })
    .catch(error => {
      console.error(error)
      res.json(error)
    });
  // res.json(paymentIntent);
});
// affirm
router.get("/Klarna/affirm/secret2", async (req, res) => {
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
router.get("/Klarna/secret3", async (req, res) => {
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

router.get("/Klarna/readers", async (req, res) => {
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
router.post("/Klarna/customers", async (req, res) => {
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
router.get("/Klarna/customers", async (req, res) => {
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
router.delete("/Klarna/customers/:id", async (req, res) => {
  try {
    const deleted = await stripe.customers.del(req.params.id);

    res.json(deleted);
    // console.log(req.body);
  } catch (error) {
    console.error(error);
    res.json(JSON.stringify(error));
  }
});

router.get("/Klarna/checkout", function (req, res, next) {
  res.render("KlarnaCheckout", { title: "Express", $publicKey });
});
router.get("/Klarna/checkout2", function (req, res, next) {
  res.render("KlarnaCheckout2", { title: "Express", $publicKey });
});
router.get("/Klarna/retrieve", async function (req, res, next) {
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
router.get("/Klarna/payment_methods/:id", async function (req, res, next) {
  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(req.params.id);
    res.json({ ...paymentMethod });
  } catch (error) {
    res.json({ ...error });
  }
  // res.render("checkout2", { title: "Express", $publicKey });
});
module.exports = router;
