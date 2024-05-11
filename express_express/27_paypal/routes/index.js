var express = require("express");
var router = express.Router();
// import fetch from "node-fetch";

// import { Headers } from "node-fetch";
const fetch = require("node-fetch");
const { Headers } = require("node-fetch");

const username = process.env.CLIENT_ID;
const password = process.env.API_KEY;
console.log("---username----", username);
console.log("---password----", password);
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/oauth2/token", async function (req, res, next) {
  try {
    let url = "https://api-m.sandbox.paypal.com/v1/oauth2/token";
    let headers = new Headers();
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    headers.set(
      "Authorization",
      "Basic " + Buffer.from(username + ":" + password).toString("base64")
    );
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    console.log(headers);
    let result = await fetch(url, {
      method: "POST",
      headers,
      body: params,
      //credentials: 'user:passwd'
    })
      .then((r) => r.json())
      .then((json) => res.json(json));
  } catch (error) {
    console.error(error);
    res.json(JSON.stringify(error));
  }
});
router.get("/createOrder/:price", async (req, res) => {
  try {
    fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "PayPal-Request-Id": "7b92603e-77ed-4896-8e78-5dea2050476a",
        Authorization:
          "Bearer A21AAJGMx5_iOWbQDMLJmVsJ1dt8_-wp2dVsrYpVVskV9ocjk5ThC2U0SGv6-dBlLdQC6aeTDQpNlvriYGO1EgflgIRDDIDjQ",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        payment_source: {
          paypal: {
            attributes: {
              vault: {
                store_in_vault: "ON_SUCCESS",
                usage_type: "MERCHANT",
              },
            },
            experience_context: {
              return_url: "https://example.com/returnUrl",
              cancel_url: "https://example.com/cancelUrl",
            },
          },
        },
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: +req.params.price + ".00",
            },
          },
        ],
      }),
    })
      .then((r) => r.json())
      .then((json) => res.json(json));
    // console.log(req.body);
  } catch (error) {
    console.error(error);
    res.json(JSON.stringify(error));
  }
});

// curl -v -X POST https://api-m.sandbox.paypal.com/v2/checkout/orders/5O190127TN364715T/capture \
// -H "Content-Type: application/json" \
// -H "Authorization: Bearer ACCESS-TOKEN" \
// -d '{}'

router.get("/capture/:id", async (req, res) => {
  try {
    fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${req.params.id}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "PayPal-Request-Id": "7b92603e-77ed-4896-8e78-5dea2050476a",
          Authorization:
            "Bearer A21AAJGMx5_iOWbQDMLJmVsJ1dt8_-wp2dVsrYpVVskV9ocjk5ThC2U0SGv6-dBlLdQC6aeTDQpNlvriYGO1EgflgIRDDIDjQ",
        },
      }
    )
      .then((r) => r.json())
      .then((json) => res.json(json));
    // {
    //   "id": "45701680Y95688128",
    //   "status": "COMPLETED",
    //   "payment_source": {
    //   "paypal": {
    //   "email_address": "sb-orzhl5456215@personal.example.com",
    //   "account_id": "VAGWC7LC76UEE",
    //   "account_status": "VERIFIED",
    //   "name": {
    //   "given_name": "John",
    //   "surname": "Doe"
    //   },
    //   "address": {
    //   "country_code": "HK"
    //   },
    //   "attributes": {
    //   "vault": {
    //   "id": "7ty792088c027022m",
    //   "status": "VAULTED",
    //   "customer": {
    //   "id": "SyJxkzyPRi"
    //   },
    //   "links": [
    //   {
    //   "href": "https://api.sandbox.paypal.com/v3/vault/payment-tokens/7ty792088c027022m",
    //   "rel": "self",
    //   "method": "GET"
    //   },
    //   {
    //   "href": "https://api.sandbox.paypal.com/v3/vault/payment-tokens/7ty792088c027022m",
    //   "rel": "delete",
    //   "method": "DELETE"
    //   },
    //   {
    //   "href": "https://api.sandbox.paypal.com/v2/checkout/orders/45701680Y95688128",
    //   "rel": "up",
    //   "method": "GET"
    //   }
    //   ]
    //   }
    //   }
    //   }
    //   },
    //   "purchase_units": [
    //   {
    //   "reference_id": "default",
    //   "shipping": {
    //   "name": {
    //   "full_name": "Bobby Liang"
    //   },
    //   "address": {
    //   "address_line_1": "New York",
    //   "admin_area_2": "New York Mills",
    //   "admin_area_1": "MN",
    //   "postal_code": "56567",
    //   "country_code": "US"
    //   }
    //   },
    //   "payments": {
    //   "captures": [
    //   {
    //   "id": "58E49861S8748114H",
    //   "status": "COMPLETED",
    //   "amount": {
    //   "currency_code": "USD",
    //   "value": "100.00"
    //   },
    //   "final_capture": true,
    //   "seller_protection": {
    //   "status": "ELIGIBLE",
    //   "dispute_categories": [
    //   "ITEM_NOT_RECEIVED",
    //   "UNAUTHORIZED_TRANSACTION"
    //   ]
    //   },
    //   "seller_receivable_breakdown": {
    //   "gross_amount": {
    //   "currency_code": "USD",
    //   "value": "100.00"
    //   },
    //   "paypal_fee": {
    //   "currency_code": "USD",
    //   "value": "5.48"
    //   },
    //   "net_amount": {
    //   "currency_code": "USD",
    //   "value": "94.52"
    //   }
    //   },
    //   "links": [
    //   {
    //   "href": "https://api.sandbox.paypal.com/v2/payments/captures/58E49861S8748114H",
    //   "rel": "self",
    //   "method": "GET"
    //   },
    //   {
    //   "href": "https://api.sandbox.paypal.com/v2/payments/captures/58E49861S8748114H/refund",
    //   "rel": "refund",
    //   "method": "POST"
    //   },
    //   {
    //   "href": "https://api.sandbox.paypal.com/v2/checkout/orders/45701680Y95688128",
    //   "rel": "up",
    //   "method": "GET"
    //   }
    //   ],
    //   "create_time": "2024-05-11T07:52:19Z",
    //   "update_time": "2024-05-11T07:52:19Z"
    //   }
    //   ]
    //   }
    //   }
    //   ],
    //   "payer": {
    //   "name": {
    //   "given_name": "John",
    //   "surname": "Doe"
    //   },
    //   "email_address": "sb-orzhl5456215@personal.example.com",
    //   "payer_id": "VAGWC7LC76UEE",
    //   "address": {
    //   "country_code": "HK"
    //   }
    //   },
    //   "links": [
    //   {
    //   "href": "https://api.sandbox.paypal.com/v2/checkout/orders/45701680Y95688128",
    //   "rel": "self",
    //   "method": "GET"
    //   }
    //   ]
    //   }

    // console.log(req.body);
  } catch (error) {
    console.error(error);
    res.json(JSON.stringify(error));
  }
});

router.get("/checkout_order_with_token/:vault_id", async (req, res) => {
  try {
    fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "PayPal-Request-Id": "7b92603e-77ed-4896-8e78-5dea2050476a",
        Authorization:
          "Bearer A21AAJGMx5_iOWbQDMLJmVsJ1dt8_-wp2dVsrYpVVskV9ocjk5ThC2U0SGv6-dBlLdQC6aeTDQpNlvriYGO1EgflgIRDDIDjQ",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        payment_source: {
          paypal: {
            vault_id: req.params.vault_id,
          },
        },
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "200.00",
            },
          },
        ],
      }),
    })
      .then((r) => r.json())
      .then((json) => res.json(json));
    // console.log(req.body);
  } catch (error) {
    console.error(error);
    res.json(JSON.stringify(error));
  }
});
module.exports = router;
