const http = require("http");

const server = http.createServer((req, res) => {
  //   res.end("Hello world !");
  res.setHeader("content-type", "text/html;charset=utf-8");
  res.end("世界 你好～");
});

server.listen(9000, () => {
  console.log("服务已经启动。。。");
});
