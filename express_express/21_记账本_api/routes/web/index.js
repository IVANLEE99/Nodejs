var express = require("express");
var router = express.Router();
const low = require("lowdb");
const shortid = require("shortid");
const AccountModel = require("../../models/AccountModel");
const moment = require("moment");
const checkLoginMiddleware = require("../../middlewares/checkLoginMiddleware");
router.get("/", (req, res, next) => {
  res.redirect("/account");
});
/* account */
//记账的列表
router.get("/account", checkLoginMiddleware, function (req, res, next) {
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
//添加记录
router.get("/account/create", checkLoginMiddleware, function (req, res, next) {
  res.render("create");
});
module.exports = router;
