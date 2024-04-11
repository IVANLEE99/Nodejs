const ejs = require("ejs");
const fs = require("fs");
let xiyou = ["唐僧", "孙悟空", "猪八戒", "沙僧"];

let str = fs.readFileSync("./02_西游.html").toString();
let result = ejs.render(str, {
  xiyou,
});

console.log(result);
