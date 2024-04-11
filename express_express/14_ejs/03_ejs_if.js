const ejs = require("ejs");
const fs = require("fs");
let isLogin = true;

let str = fs.readFileSync("./03_ejs_if.html").toString();
let result = ejs.render(str, {
  isLogin,
});

console.log(result);
