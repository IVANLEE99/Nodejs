const http = require("http");
const url = require("url");
const server = http.createServer((req, res) => {
  let body = "";
  let resObj = url.parse(req.url, true);
  console.log(resObj);
  // Url {
  //   protocol: null,
  //   slashes: null,
  //   auth: null,
  //   host: null,
  //   port: null,
  //   hostname: null,
  //   hash: null,
  //   search: '?keyword=h5',
  //   query: [Object: null prototype] { keyword: 'h5' },
  //   pathname: '/search',
  //   path: '/search?keyword=h5',
  //   href: '/search?keyword=h5'
  // }
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
