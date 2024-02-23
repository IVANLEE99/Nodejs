/**
 * https://www.bilibili.com/video/BV1gM411W7ex/?p=30&spm_id_from=pageDriver&vd_source=b57ea8d1b635335f6a0048588ea5fc86
 */

const fs = require("fs");
//相对路径 的参照物：命令行的工作目录

// fs.writeFileSync("./index.html", "love");
// fs.writeFileSync("index.html", "love002");
// fs.writeFileSync("../index.html", "love003"); //上一层目录

//绝对路径  __dirname 所在文件的所在目录的绝对路径

fs.writeFileSync(__dirname + "/index.html", "love00999");
