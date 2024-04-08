const http = require("http");
const server = http.createServer((req, res) => {
  let { method, url } = req;
  let { pathname } = new URL(url, "http://127.0.0.1");
  //设置响应头
  res.setHeader("content-type", "text/html;charset=utf8");
  res.setHeader("test", ["a", "b", "c"]);
  res.setHeader("myHeader", ["a", "b", "c"]);
  //设置响应码
  res.statusCode = 200;
  //设置响应状态的描述
  res.statusMessage = "200";

  //响应体的设置
  res.write("love");
  res.write("love");
  res.write("love");
  res.write("love");

  if (method === "GET" && pathname === "/login") {
    res.end("登录页面");
  } else if (method === "GET" && pathname === "/reg") {
    res.end("注册页面");
  } else {
    res.end("Not Found");
  }
});
server.listen(9000, () => {
  console.log("server listen 9000 ...");
});
