/**
 * 1 3 4 5 6 7 8 9 10
 * 缺少2
 * 后面的文件改成2 3 4 5 6 7 8 9
 */
const fs = require("fs");
let files = fs.readdirSync("./code");
let arr = [];
files.forEach((file) => {
  console.log(file);
  let data = file.split("-");
  let [num, name] = data;
  let newName = file;
  if (+num < 10) {
    // newName = "0" + num + "-" + name;
    num = "0" + +num;
    newName = num + "-" + name;
  }
  arr.push({
    file,
    num,
    name,
  });
});
arr.sort((a, b) => +a.num - +b.num);
let correctNum = 1;
console.log(arr);
arr.forEach((e) => {
  let { file, num, name } = e;
  if (+num !== correctNum) {
    num = correctNum >= 10 ? correctNum : "0" + correctNum;
    correctNum = +num;
  }
  let newName = num + "-" + name;
  fs.renameSync(`./code/${file}`, `./code/${newName}`);
  correctNum = +correctNum + 1;
  console.log({ file, num, name });
});
// fs.renameSync(`./code/${file}`, `./code/${newName}`);

//+0,排序，改
// 旧名字 -》新名字
// {
//   file:'',
//   newName:''
// }
