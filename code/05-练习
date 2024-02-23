/**
 * https://www.bilibili.com/video/BV1gM411W7ex/?p=24&spm_id_from=pageDriver&vd_source=b57ea8d1b635335f6a0048588ea5fc86
 * 需求：复制笑看风云
 */
const fs = require("fs");
const process = require("process");
// 方式一：fs.readFileSync
// let data = fs.readFileSync("./static/郑少秋-笑看风云.mp3");
// fs.writeFileSync("./static/郑少秋-笑看风云002.mp3", data);
// console.log(process.memoryUsage());//rss: 32440320, =>30.9M

// 方式二：fs.createReadStream

// let rs = fs.createReadStream("./static/郑少秋-笑看风云.mp3");
// let ws = fs.createWriteStream("./static/郑少秋-笑看风云003.mp3");
// rs.on("data", (chunk) => {
//   ws.write(chunk);
// });
// rs.on("end", () => {
//   console.log("static/郑少秋-笑看风云003.mp3 复制完成");
//   console.log(process.memoryUsage()); //rss: 32882688 =>31.35M
// });

//方式三 pipe
let rs = fs.createReadStream("./static/郑少秋-笑看风云.mp3");
let ws = fs.createWriteStream("./static/郑少秋-笑看风云004.mp3");
rs.pipe(ws);
console.log(process.memoryUsage()); //rss: 21979136/1024/1024=>20.96M
