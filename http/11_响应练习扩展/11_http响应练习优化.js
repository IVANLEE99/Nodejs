/**
 * 搭建http服务，响应一个4行3列的表哥，并要求表格有隔行换色效果
 * 且点击单元格能高亮显示
 */
const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  let { method, url } = req;
  let { pathname } = new URL(url, "http://127.0.0.1");
  if (pathname === "/") {
    //设置响应头
    res.setHeader("content-type", "text/html;charset=utf8");
    let file = fs.readFileSync(__dirname + "/index.html");
    res.end(file);
  } else if (pathname === "/index.css") {
    let file = fs.readFileSync(__dirname + "/index.css");
    res.end(file);
  } else if (pathname === "/index.js") {
    let file = fs.readFileSync(__dirname + "/index.js");
    res.end(file);
  } else {
    res.end("<h1>not found</h1>");
  }
});
server.listen(9000, () => {
  console.log("server listen 9000 ...");
});
