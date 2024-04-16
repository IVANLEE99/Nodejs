var express = require("express");
var router = express.Router();
const $publicKey =
  "pk_test_51LyskKEmZ3YgtBNvqPmx4st6NVJzimkwXUMEIBgpZuSqA89P27zYybWKYN5JnxVfTNBzPFcwmq7v7o91CdRgIbi80001ksPqDE";
const $privateKey =
  "sk_test_51LyskKEmZ3YgtBNvs487pMzeq57BDBkgbGQI1n6hSCnPqhJqMq9Ez185AA67C6rHYi4xp8X3Xj1FKixbzZX6wqWf00DSlDWV9O";
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

router.get("/checkout", function (req, res, next) {
  res.render("checkout", { title: "Express", $publicKey });
});
module.exports = router;
