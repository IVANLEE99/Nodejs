var express = require("express");
var router = express.Router();
const $publicKey = process.env.PUBLIC_KEY;
const $privateKey = process.env.PRIVATE_KEY;
const stripe = require("stripe")($privateKey);
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/secret", async (req, res) => {
  const intent = await stripe.paymentIntents.create({
    amount: 6000,
    currency: "usd",
    payment_method_types: ["affirm"],
    // automatic_payment_methods: {
    //   enabled: true,
    // },
  }); // ... Fetch or create the PaymentIntent
  res.json({ client_secret: intent.client_secret });
});

router.get("/secret2", async (req, res) => {
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

router.get("/checkout", function (req, res, next) {
  res.render("checkout", { title: "Express", $publicKey });
});
router.get("/checkout2", function (req, res, next) {
  res.render("checkout2", { title: "Express", $publicKey });
});
router.get("/retrieve", async function (req, res, next) {
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
router.get("/payment_methods/:id", async function (req, res, next) {
  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(req.params.id);
    res.json({ ...paymentMethod });
  } catch (error) {
    res.json({ ...error });
  }
  // res.render("checkout2", { title: "Express", $publicKey });
});
module.exports = router;
