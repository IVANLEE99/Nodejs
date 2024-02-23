/**
 * https://www.bilibili.com/video/BV1gM411W7ex/?p=28&spm_id_from=pageDriver&vd_source=b57ea8d1b635335f6a0048588ea5fc86
 *
 */

const fs = require("fs");
fs.stat("./static/郑少秋-笑看风云.mp3", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  if (data) {
    console.log(data);
    console.log(data.isFile());
    console.log(data.isDirectory());

    // Stats {
    //     dev: 16777220,
    //     mode: 33188,
    //     nlink: 1,
    //     uid: 501,
    //     gid: 20,
    //     rdev: 0,
    //     blksize: 4096,
    //     ino: 65533296,
    //     size: 10616374,//字节
    //     blocks: 20736,
    //     atimeMs: 1708586658307.9878,
    //     mtimeMs: 1708586121481.4602,
    //     ctimeMs: 1708586229467.105,
    //     birthtimeMs: 1708586121433.3132,
    //     atime: 2024-02-22T07:24:18.308Z,
    //     mtime: 2024-02-22T07:15:21.481Z,
    //     ctime: 2024-02-22T07:17:09.467Z,
    //     birthtime: 2024-02-22T07:15:21.433Z
    //   }
    //   true
    //   false
  }
});
