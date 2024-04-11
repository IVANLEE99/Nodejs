const express = require("express");
const router = express.Router();
router.get("/admin", (req, res) => {
  res.send("admin 页面");
});
router.get("/setting", (req, res) => {
  res.send("setting 页面");
});
module.exports = router;
