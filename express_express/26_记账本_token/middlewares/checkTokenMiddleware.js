const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");
module.exports = function (req, res, next) {
  let token = req.get("token");
  if (!token) {
    res.json({
      code: "2004",
      message: "token 缺失",
      data: null,
    });
    return;
  }
  jwt.verify(req.get("token"), secret, (err, data) => {
    if (err) {
      console.error(err);
      res.json({
        code: "2004",
        message: "token错误",
        data: null,
      });
      return;
    }
    req.user = data;
    next();
  });
};
