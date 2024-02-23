const fs = require("fs");
let rs = fs.createReadStream("./static/郑少秋-笑看风云.mp3");

rs.on("data", (chunk) => {
  console.log(chunk.length); //65536字节 =》64kb
});

rs.on("end", () => {
  console.log("读取完成");
});
