// 导入express
const express = require("express");
//创建应用
const app = new express();
//监听路由
app.get("/respond", (req, res) => {
  // res.statusCode = 404;
  // res.statusMessage = "love";
  // res.setHeader("content-type", "text/html;charset=utf8");
  // res.setHeader("xxx", "yyy");
  // res.write("hello express");
  // res.end(" respond  测试");

  // res.status(500)
  // res.set('yyyyy','xxxxx')
  // res.send('hello express 你好')

  res.status(600).set("jjjjj", "sdfsfsf").send("hello express 谁的粉丝");
});

//监听端口
app.listen(9000, () => {
  console.log("express is listen on 9000");
});
