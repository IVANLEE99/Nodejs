// https://www.npmjs.com/package/lowdb/v/1.0.0
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(__dirname + "/db.json");
const db = low(adapter);

// Set some defaults
db.defaults({ posts: [], user: {} }).write();

// 增Add a post
let addres = db.get("posts").push({ id: 2, title: "lowdb is awesome" }).write();
console.log(addres);

// Set a user using Lodash shorthand syntax
let setres = db.set("user.name", "typicode").write();
console.log(setres);

// 查 Use .value() instead of .write() if you're only reading from db
let searchres = db.get("posts").find({ id: 2 }).value();
console.log("searchres:", searchres);

let searchres002 = db.get("posts").value();
console.log("searchres002:", searchres002);

//删除数据
let removeres = db.get("posts").remove({ id: 1 }).write();
console.log("removeres:", removeres);

//改数据
let updateres = db
  .get("posts")
  .find({ id: 2 })
  .assign({ content: 23333 })
  .write();
console.log("updateres:", updateres);
