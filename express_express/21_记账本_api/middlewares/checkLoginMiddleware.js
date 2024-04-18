module.exports = function (req, res, next) {
  console.log(req.session);
  if (!req.session.username) {
    res.redirect("/login");
  } else {
    next();
  }
};
