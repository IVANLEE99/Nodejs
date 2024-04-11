const express = require("express");
const router = express.Router();
//监听路由
router.get("/home", (req, res) => {
  res.send("home 首页");
});
router.get("/content", (req, res) => {
  res.send("content 页面");
});
module.exports = router;
