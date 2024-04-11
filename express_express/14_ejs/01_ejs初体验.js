const ejs = require("ejs");
const fs = require("fs");
// let str = `我爱你 <%=china%>`;
let china = "中国00";
let world = "世界";
let weather = "晴朗";
let str = fs.readFileSync(__dirname + "/01_html.html").toString();
console.log(str);
let result = ejs.render(str, { china, world, weather });

console.log(result);
