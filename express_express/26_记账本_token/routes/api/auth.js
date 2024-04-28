var express = require("express");
var router = express.Router();
const low = require("lowdb");
const shortid = require("shortid");
const UserModel = require("../../models/UserModel");
const md5 = require("md5");
const { secret } = require("../../config/config");

const jwt = require("jsonwebtoken");
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
      console.log(data);
      if (data) {
        // req.session.username = data.username;
        // req.session._id = data._id;
        let token = jwt.sign(
          {
            username: data.username,
            _id: data._id,
          },
          secret,
          {
            expiresIn: 24 * 60 * 60,
          }
        );
        res.json({
          //响应编号 0000表示成功
          code: "0000",
          //响应信息
          msg: "登录成功～",
          //响应的数据
          data: token,
        });
      } else {
        // res.status(500).send("登录失败！");
        res.json({
          //响应编号 0000表示成功
          code: "2001",
          //响应信息
          msg: "登录失败～",
          //响应的数据
          data: null,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      // res.status(500).send("登录失败！");
      res.json({
        //响应编号 0000表示成功
        code: "2002",
        //响应信息
        msg: "登录失败～",
        //响应的数据
        data: null,
      });
    });
});

router.get("/logout", function (req, res, next) {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});
module.exports = router;
