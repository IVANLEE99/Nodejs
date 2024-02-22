//buffer 与字符串转换
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
// console.log(buf_4.toString()); //iloveyou //utf-8

let buf_5 = Buffer.from("hello");
// console.log(buf_5[0].toString()); //104
// console.log(buf_5[0].toString(2)); //1101000
// console.log(buf_5); //<Buffer 68 65 6c 6c 6f>
buf_5[0] = 95;
// console.log(buf_5); //<Buffer 5f 65 6c 6c 6f>
// console.log(buf_5.toString()); //_ello

// let buf_5 = Buffer.from("hello");
// console.log(buf_5[0].toString()); //104
// console.log(buf_5[0].toString(2)); //1101000

//溢出 一个元素8bit
let buf_6 = Buffer.from("hello");
buf_6[0] = 361; //舍弃高位的数字 1101001
// console.log(buf_6[0].toString(2)); //0001 0110 1001=》0110 1001

//中文 一个中文3字节
let buf_7 = Buffer.from("你好");
console.log(buf_7); //<Buffer e4 bd a0 e5 a5 bd>
