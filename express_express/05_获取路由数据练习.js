// 导入express
const express = require("express");
const { singerlist } = require("./singer.json");
//创建应用
const app = new express();
//监听路由
app.get("/:id.html", (req, res) => {
  res.setHeader("content-type", "text/html;charset=utf-8");
  let { id } = req.params;
  let result = singerlist.find((s) => {
    if (+s.singer_id === +id) {
      return true;
    }
  });
  console.log(result);
  if (!result) {
    res.statusCode = 400;
    res.end("<h1>404 not found</h1>");
    return;
  }
  res.end(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <h1>${result.singer_name}</h1>
      <img
        src="${result.singer_pic}"
        alt=""
        srcset=""
      />
    </body>
  </html>
  
  `);
});

//监听端口
app.listen(9000, () => {
  console.log("express is listen on 9000");
});
