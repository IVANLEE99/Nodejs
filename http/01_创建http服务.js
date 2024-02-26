const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello world !");
});

server.listen(9000, () => {
  console.log("服务已经启动。。。");
});
