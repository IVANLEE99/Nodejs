// 1、导入express
const express = require("express");
const bodyParser = require("body-parser");
/**
 * https://www.npmjs.com/package/body-parser
 */
// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
//2、创建应用
const app = new express();
//3、监听路由
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/11_form.html");
});
app.post("/login", urlencodedParser, (req, res) => {
  console.log(req.body);
  res.sendFile(__dirname + "/11_form.html");
});
// POST /api/users gets JSON bodies
app.post("/api/users", jsonParser, function (req, res) {
  // create user in req.body
  console.log(req.body);
  res.sendFile(__dirname + "/11_form.html");
});
//4、监听端口
app.listen(9000, () => {
  console.log("express is listen on 9000");
});
