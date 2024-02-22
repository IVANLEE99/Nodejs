const fs = require("fs");
let files = fs.readdirSync("./code");
files.forEach((file) => {
  console.log(file);
  let data = file.split("-");
  let [num, name] = data;
  let newName = file;
  if (+num < 10) {
    newName = "0" + num + "-" + name;
  }
  fs.renameSync(`./code/${file}`, `./code/${newName}`);
});
