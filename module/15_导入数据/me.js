function tiemo(params) {
  console.log("tiemo...");
}
function niejiao(params) {
  console.log("niejiao...");
}

//1、module.exports 可以导出任何数据
// module.exports = tiemo;
// module.exports = 1;
// module.exports = 'dfdfdfd';
// module.exports = {
//   tiemo,
//   niejiao,
// };

//2、不能使用 exports=value 这种方式暴露数据
// exports='dfdfd'

//3.exports和module.exports 的关系是
// exports = module.exports = {};

// console.log(exports === module.exports);//true

// exports.tiemo = tiemo;
// exports.niejiao = niejiao;

module.exports = "me.js";
