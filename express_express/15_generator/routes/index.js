var express = require("express");
var router = express.Router();
const path = require("path");
// https://www.npmjs.com/package/formidable
const { formidable } = require("formidable");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
//
router.get("/portrait", function (req, res, next) {
  res.render("portrait", { title: "Express" });
});
router.post("/portrait", function (req, res, next) {
  const form = formidable({
    uploadDir: path.resolve(__dirname, "../public/images"),
    keepExtensions: true,
  });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    // res.json({ fields, files });
    res.render("upload-sucess", {
      name: fields.name && fields.name[0],
      portrait: "/images/" + (files.portrait && files.portrait[0].newFilename),
    });
  });
  // res.send("success");
});
module.exports = router;
