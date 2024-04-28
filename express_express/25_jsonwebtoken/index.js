// https://www.npmjs.com/package/jsonwebtoken

var jwt = require("jsonwebtoken");
// var token = jwt.sign({ name: "张三" }, "youngsdream", {
//   expiresIn: 60,
// });

// console.log(token);

let t =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi5byg5LiJIiwiaWF0IjoxNzE0Mjg4Njk2LCJleHAiOjE3MTQyODg3NTZ9.q0ZizSrIhV3ppF5HqNCZxcTVHpLMCwaHBLoibH58heA";

jwt.verify(t, "youngsdream", function (err, decoded) {
  console.log(err);
  console.log(decoded); // bar
});
