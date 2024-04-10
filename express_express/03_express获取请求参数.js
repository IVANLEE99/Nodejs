// 1、导入express
const express = require("express");
const fs = require("fs");
//2、创建应用
const app = new express();
//3、监听路由
app.get("/home", (req, res) => {
  res.end("/home0000");
});
//3、//
app.get("/02_form.html", (req, res) => {
  fs.readFile(__dirname + req.url, (err, data) => {
    if (err) {
      res.end("server error:" + err.message);
    }
    res.end(data);
  });
});
//post
app.post("/post", (req, res) => {
  res.end("post");
});

//all
app.all("/test", (req, res) => {
  res.end("test");
});

//all
app.all("*", (req, res) => {
  //原生操作
  // console.log(req.method);
  // console.log(req.url);
  // console.log(req.httpVersion);
  // console.log(req.headers);

  //express 操作
  console.log(req.path);
  console.log(req.query);
  console.log(req.ip);
  console.log(req.get("host"));
  // console.log(req);

  res.end("404 not found");
});

//4、监听端口
app.listen(9000, () => {
  console.log("express is listen on 9000");
});
