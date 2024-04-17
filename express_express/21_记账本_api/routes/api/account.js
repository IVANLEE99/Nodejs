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
      res.json({
        //响应编号 0000表示成功
        code: "0000",
        //响应信息
        msg: "读取成功～",
        //响应的数据
        data: data,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        //响应编号 0000表示成功
        code: "1001",
        //响应信息
        msg: "读取失败！" + err.message,
        //响应的数据
        data: null,
      });
    });
});

//删除记录
router.delete("/account/:id", function (req, res, next) {
  let { id } = req.params;
  // db.get("accounts").remove({ id }).write();
  AccountModel.deleteOne({
    _id: id,
  })
    .then((data) => {
      // console.log(data);
      // res.render("success", {
      //   msg: "删除成功",
      //   url: "/account",
      // });
      res.json({
        //响应编号 0000表示成功
        code: "0000",
        //响应信息
        msg: "删除成功～",
        //响应的数据
        data: data,
      });
    })
    .catch((err) => {
      // res.render("success", {
      //   msg: "删除失败！" + err.message,
      //   url: "/account",
      // });
      res.json({
        //响应编号 0000表示成功
        code: "10003",
        //响应信息
        msg: "删除失败～" + err.message,
        //响应的数据
        data: null,
      });
    });
});
//添加记录接口
router.post("/account", function (req, res, next) {
  // console.log(req.body);
  // [Object: null prototype] {
  //   title: 'dfdfdf',
  //   time: '2024-04-10',
  //   type: '-1',
  //   account: '1333',
  //   remarks: '我也要'
  // }
  // db.get("accounts")
  //   .unshift({ id: shortid.generate(), ...req.body })
  //   .write();
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate(),
  })
    .then((data) => {
      // console.log(data);
      // res.render("success", {
      //   msg: "添加成功",
      //   url: "/account",
      // });
      res.json({
        //响应编号 0000表示成功
        code: "0000",
        //响应信息
        msg: "添加成功～",
        //响应的数据
        data: data,
      });
    })
    .catch((err) => {
      console.error(err);
      // res.render("success", {
      //   msg: "添加失败！" + err.message,
      //   url: "/account",
      // });
      res.json({
        //响应编号 0000表示成功
        code: "1002",
        //响应信息
        msg: "添加失败！" + err.message,
        //响应的数据
        data: null,
      });
    });
});

//获取单个记录
router.get("/account/:id", function (req, res, next) {
  let { id } = req.params;
  // db.get("accounts").remove({ id }).write();
  AccountModel.findById({
    _id: id,
  })
    .then((data) => {
      // console.log(data);
      // res.render("success", {
      //   msg: "删除成功",
      //   url: "/account",
      // });
      res.json({
        //响应编号 0000表示成功
        code: "0000",
        //响应信息
        msg: "查询成功～",
        //响应的数据
        data: data,
      });
    })
    .catch((err) => {
      // res.render("success", {
      //   msg: "删除失败！" + err.message,
      //   url: "/account",
      // });
      res.json({
        //响应编号 0000表示成功
        code: "10004",
        //响应信息
        msg: "查询失败～" + err.message,
        //响应的数据
        data: null,
      });
    });
});

//更新单个记录
router.patch("/account/:id", function (req, res, next) {
  let { id } = req.params;
  let obj = {
    ...req.body,
  };
  if (req.body.time) {
    obj.time = moment(req.body.time).toDate();
  }
  AccountModel.updateOne({ _id: id }, { ...obj })
    .then((data) => {
      AccountModel.findById({
        _id: id,
      })
        .then((data) => {
          // console.log(data);
          // res.render("success", {
          //   msg: "删除成功",
          //   url: "/account",
          // });
          res.json({
            //响应编号 0000表示成功
            code: "0000",
            //响应信息
            msg: "更新成功～",
            //响应的数据
            data: data,
          });
        })
        .catch((err) => {
          // res.render("success", {
          //   msg: "删除失败！" + err.message,
          //   url: "/account",
          // });
          res.json({
            //响应编号 0000表示成功
            code: "10005",
            //响应信息
            msg: "更新失败～" + err.message,
            //响应的数据
            data: null,
          });
        });
    })
    .catch((err) => {
      res.json({
        //响应编号 0000表示成功
        code: "10005",
        //响应信息
        msg: "更新失败～" + err.message,
        //响应的数据
        data: null,
      });
    });
  // db.get("accounts").remove({ id }).write();
});
module.exports = router;
