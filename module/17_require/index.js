//require()的执行步骤
// https://www.bilibili.com/video/BV1gM411W7ex?p=72&spm_id_from=pageDriver&vd_source=b57ea8d1b635335f6a0048588ea5fc86
//1、将路径转为绝对路径
// 2、缓存检测 ，有缓存则返回缓存
// 3、读取文件的代码
// 4、包装成一个立马执行的函数执行
/**
 * 
 (function (exports, require, module, __filename, __dirname) {
    function tiemo(params) {
      console.log("tiemo...");
    }
    function niejiao(params) {
      console.log("niejiao...");
    }
    console.log(arguments.callee.toString());
    
    module.exports = "me.js";
    
    })(exports, require, module, __filename, __dirname)
 */
// 5、缓存结果
// 6、返回module.exports的值

const me = require("./me");
console.log(me);
// me.tiemo();
// me.niejiao();
