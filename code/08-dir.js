/**
 * 文件夹操作
 * mkdir/mkdirSync
 * readdir/readdirSync
 * rmdir/rmdirSync  => rm/rmSync
 */

const { error } = require("console");
const fs = require("fs");

// //创建test 文件夹
// fs.mkdir("./fs/test", (error) => {
//   if (error) {
//     console.error(error);
//     return;
//   }
//   console.log("创建文件夹成功");
// });

// //递归创建test/b/c/d 文件夹
// fs.mkdir("./fs/test/b/c/d", { recursive: true }, (error) => {
//   if (error) {
//     console.error(error);
//     return;
//   }
//   console.log("创建文件夹成功");
// });

// //读取文件夹
// fs.readdir("./", (error, data) => {
//   if (error) {
//     console.error(error);
//     return;
//   }
//   console.log("读取文件夹成功");
//   console.log(data);
// });

// //删除文件夹
// fs.rmdir("./fs/test", { recursive: true }, (error) => {
//   if (error) {
//     console.error(error);
//     return;
//   }
//   console.log("删除文件夹成功");
// });


//删除文件夹 建议使用
fs.rm("./fs/test", { recursive: true }, (error) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log("删除文件夹成功");
  });