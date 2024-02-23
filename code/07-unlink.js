const fs = require("fs");
// fs.unlinkSync
// fs.rmSync
fs.unlink("./fs/data.txt", (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("删除成功");
});

fs.rm("./fs/座右铭.txt", (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("删除成功座右铭");
});
