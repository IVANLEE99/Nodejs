const axios = require('axios');

const username = process.env.CLIENT_ID;
const password = process.env.API_KEY;
module.exports = function (req, res, next) {
  axios
    .request({
      url: 'https://api-demo.airwallex.com/api/v1/authentication/login',
      method: 'post',
      headers: {
        'x-client-id': username,
        'x-api-key': password,
      },
    })
    .then(({ data }) => {
      console.log('__Authorization--------', data.token)
      req.__Authorization = 'Bearer ' + data.token;
      next();
    })
    .catch(error => {
      console.error(error)
      next();
    });
};
