var express = require("express");
var router = express.Router();

/* account */
//记账的列表
router.get("/account", function (req, res, next) {
  res.render("account");
});

//添加记录
router.get("/account/create", function (req, res, next) {
  res.render("create");
});

//添加记录接口
router.post("/account", function (req, res, next) {
  console.log(req.body);
  // [Object: null prototype] {
  //   title: 'dfdfdf',
  //   time: '2024-04-10',
  //   type: '-1',
  //   account: '1333',
  //   remarks: '我也要'
  // }
  res.send("添加成功");
});

module.exports = router;
