const fs = require("fs");
//重命名
// fs.rename("./座右铭.txt", "./座右铭02.txt", (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("重命名成功");
// });

// //移动
// fs.rename("./data.txt", "./fs/data.txt", (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("移动成功");
// });

// fs.renameSync("./观书有感.txt", "./观书有感002.txt");
fs.renameSync("./观书有感002.txt", "./fs/观书有感002.txt");
