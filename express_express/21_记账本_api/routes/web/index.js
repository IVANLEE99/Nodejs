var express = require("express");
var router = express.Router();
const low = require("lowdb");
const shortid = require("shortid");
const AccountModel = require("../../models/AccountModel");
const moment = require("moment");

/* account */
//记账的列表
router.get("/account", function (req, res, next) {
  // const list = db.get("accounts").value();
  // res.render("account", { list });
  AccountModel.find()
    .sort("-1")
    .then((data) => {
      res.render("account", { list: data, moment });
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send("查询失败～");
    });
});
module.exports = router;
