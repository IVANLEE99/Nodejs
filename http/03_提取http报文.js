const http = require("http");

const server = http.createServer((req, res) => {
  //   res.end("Hello world !");
  //获取请求方法
  console.log(req.method);
  //获取请求url
  console.log(req.url);
  //获取http协议的版本号
  console.log(req.httpVersion);
  //获取http的请求头
  console.log(req.headers);
  res.setHeader("content-type", "text/html;charset=utf-8");
  res.end("世界 你好～");
});

server.listen(9000, () => {
  console.log("服务已经启动。。。");
});
