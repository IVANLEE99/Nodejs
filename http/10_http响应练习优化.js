/**
 * 搭建http服务，响应一个4行3列的表哥，并要求表格有隔行换色效果
 * 且点击单元格能高亮显示
 */
const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  let { method, url } = req;
  let { pathname } = new URL(url, "http://127.0.0.1");
  //设置响应头
  res.setHeader("content-type", "text/html;charset=utf8");
  let file = fs.readFileSync(__dirname + "/10_table.html");
  res.end(file);
});
server.listen(9000, () => {
  console.log("server listen 9000 ...");
});
