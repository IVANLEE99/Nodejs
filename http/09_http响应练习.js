/**
 * 搭建http服务，响应一个4行3列的表哥，并要求表格有隔行换色效果
 * 且点击单元格能高亮显示
 */
const http = require("http");
const server = http.createServer((req, res) => {
  let { method, url } = req;
  let { pathname } = new URL(url, "http://127.0.0.1");
  //设置响应头
  res.setHeader("content-type", "text/html;charset=utf8");
  res.end(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        table {
          border-collapse: collapse;
        }
        td {
          border: 1px solid red;
          padding: 10px;
        }
        tr:nth-child(2n) {
          background-color: pink;
        }
        tr:nth-child(2n + 1) {
          background-color: rgb(34, 205, 100);
        }
      </style>
    </head>
    <body>
      <table>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <script>
        let tds = document.querySelectorAll("td");
        tds.forEach((td) => {
          td.onclick = function () {
            td.style.backgroundColor = "#000";
          };
        });
      </script>
    </body>
  </html>
  
  `);
});
server.listen(9000, () => {
  console.log("server listen 9000 ...");
});
