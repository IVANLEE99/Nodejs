// 导入express
const express = require("express");
const fs = require("fs");
//创建应用
const app = new express();
//监听路由
app.get("/other", (req, res) => {
  //重定向
  // res.statusCode = 302;
  // res.setHeader("Location", "http://jd.com");
  // res.end("");

  // res.redirect("http://taobao.com");

  //下载响应
  // res.download(__dirname + "/index.html");

  //   Content-Disposition:
  // attachment; filename="index.html"
  res.setHeader("Content-Disposition", 'attachment; filename="download.html');

  // fs.readFile(__dirname + "/index.html", (err, data) => {
  //   if (err) {
  //     res.end(err.message);
  //   }
  //   res.end(data);
  // });
  //响应json
  // res.json({
  //   hello: "world",
  // });

  //响应文件
  res.sendFile(__dirname + "/index.html");


  // res.statusCode = 404;
  // res.statusMessage = "love";
  // res.setHeader("content-type", "text/html;charset=utf8");
  // res.setHeader("xxx", "yyy");
  // res.write("hello express");
  // res.end(" respond  测试");

  // res.status(500)
  // res.set('yyyyy','xxxxx')
  // res.send('hello express 你好')

  // res.status(600).set("jjjjj", "sdfsfsf").send("hello express 谁的粉丝");
});

//监听端口
app.listen(9000, () => {
  console.log("express is listen on 9000");
});
