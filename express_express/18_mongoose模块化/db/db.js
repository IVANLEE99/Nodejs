const { DBHOST, DBPORT, DBNAME } = require("../config/config");
module.exports = function (success, error, close) {
  const mongoose = require("mongoose");
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

  mongoose.connection.on("open", () => {
    success && success();
    console.log("open~");
  });
  mongoose.connection.on("error", () => {
    error && error();
    console.log("error~");
  });
  mongoose.connection.on("close", () => {
    close && close();
    console.log("close~");
  });
};
