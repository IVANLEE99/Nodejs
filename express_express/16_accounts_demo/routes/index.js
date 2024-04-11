var express = require("express");
var router = express.Router();
const low = require("lowdb");
const shortid = require("shortid");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(__dirname + "/../data/db.json");
const db = low(adapter);
/* account */
//记账的列表
router.get("/account", function (req, res, next) {
  const list = db.get("accounts").value();
  res.render("account", { list });
});

//添加记录
router.get("/account/create", function (req, res, next) {
  res.render("create");
});
//删除记录
router.get("/account/:id", function (req, res, next) {
  let { id } = req.params;
  db.get("accounts").remove({ id }).write();
  res.render("success", {
    msg: "删除成功",
    url: "/account",
  });
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
  db.get("accounts")
    .unshift({ id: shortid.generate(), ...req.body })
    .write();
  res.render("success", {
    msg: "添加成功",
    url: "/account",
  });
});

module.exports = router;
