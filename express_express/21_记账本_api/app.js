var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// https://www.npmjs.com/package/express-session
const session = require("express-session");
const MongoStore = require("connect-mongo");
// express_express/21_记账本_api/config/config.js
const { DBHOST, DBPORT, DBNAME } = require("./config/config");
var indexRouter = require("./routes/web/index");
var accountRouter = require("./routes/api/account");
var authRouter = require("./routes/web/auth");
// express_express/21_记账本_api/routes/web/auth.js
var app = express();

app.use(
  session({
    name: "sid",
    secret: "keyboard cat",
    saveUninitialized: false,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`,
    }),
    cookie: { httpOnly: true, maxAge: 60 * 1000 * 60 * 24 * 7 },
  })
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", accountRouter);
app.use("/", authRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
