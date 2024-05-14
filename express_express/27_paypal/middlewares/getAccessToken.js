const fetch = require("node-fetch");
const { Headers } = require("node-fetch");

const username = process.env.CLIENT_ID;
const password = process.env.API_KEY;
module.exports = function (req, res, next) {
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
    fetch(url, {
      method: "POST",
      headers,
      body: params,
      //credentials: 'user:passwd'
    })
      .then((r) => r.json())
      // .then((json) => res.json(json))
      .then((token) => {
        req.__Authorization = token.token_type + " " + token.access_token;
        next();
      });
  } catch (error) {
    console.error(error);
    next();
  }
};
