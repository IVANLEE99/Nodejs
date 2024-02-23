const path = require("path");
// // path.resolve
// console.log(path.resolve(__dirname,'path.js'));
// console.log(path.resolve(__dirname,'./path.js'));
// console.log(path.resolve(__dirname,'/path.js','./test'));

console.log(path.sep);

//__filename 文件的绝对路径
console.log(__filename);

let str = "/Users/youngsdream/Documents/youngs001-test/Nodejs/path/path.js";

console.log(path.parse(str));

console.log(path.basename(str));
console.log(path.dirname(str));
console.log(path.extname(str));
