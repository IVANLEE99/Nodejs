const express = require("express");
// https://www.npmjs.com/package/cookie-parser
var cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

app.get("/set-cookie", (req, res) => {
  res.cookie("name", "zhangsan", {
    maxAge: 60 * 1000,
  });
  res.cookie("theme", "blue");
  res.send("/");
});
app.get("/remove-cookie", (req, res) => {
  res.clearCookie("name");
  res.send("删除成功～");
});
app.get("/get-cookie", (req, res) => {
  res.json({
    ...req.cookies,
  });
});
app.listen(9000, () => {
  console.log("app is listen in 9000~~~");
});
