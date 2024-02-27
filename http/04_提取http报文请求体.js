const http = require("http");

const server = http.createServer((req, res) => {
  let body = "";
  //绑定data事件
  req.on("data", (chunk) => {
    body += chunk;
  });
  //绑定end 事件
  req.on("end", () => {
    console.log(body);
    res.setHeader("content-type", "text/html;charset=utf-8");
    res.end("世界 你好～");
  });
});

server.listen(9000, () => {
  console.log("服务已经启动。。。");
});
