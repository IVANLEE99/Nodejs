var express = require("express");
var router = express.Router();
const low = require("lowdb");
const shortid = require("shortid");
const UserModel = require("../../models/UserModel");
const md5 = require("md5");
//添加记录
router.get("/reg", function (req, res, next) {
  res.render("auth/reg");
});
//添加记录
router.post("/reg", function (req, res, next) {
  UserModel.create({
    ...req.body,
    password: md5(req.body.password),
  })
    .then((data) => {
      res.render("success", {
        msg: "注册成功！",
        url: "/login",
      });
    })
    .catch((err) => {
      res.status(500).send("注册失败！");
    });
});

//添加记录
router.get("/login", function (req, res, next) {
  res.render("auth/login");
});
//添加记录
router.post("/login", function (req, res, next) {
  UserModel.findOne({
    ...req.body,
    password: md5(req.body.password),
  })
    .then((data) => {
      if (data) {
        req.session.username = data.username;
        req.session._id = data._id;
        res.render("success", {
          msg: "登录成功！",
          url: "/account",
        });
      } else {
        res.status(500).send("登录失败！");
      }
    })
    .catch((err) => {
      res.status(500).send("登录失败！");
    });
});

router.get("/logout", function (req, res, next) {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});
module.exports = router;
