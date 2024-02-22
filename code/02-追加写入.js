const fs = require("fs");
fs.appendFile("./座右铭.txt", "\r\n择其善者而从之，择其不善者而改之", (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("appendFile追加成功");
});

fs.appendFileSync("./座右铭.txt", "\r\n温故而知新，可以为师矣");
console.log("appendFileSync追加成功");

//w=写入模式 a=追加模式 r=读取模式
fs.writeFile("./座右铭.txt", "\r\n己所不欲勿施于人", { flag: "a" }, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("writeFile追加成功");
});
