const express = require("express");
// https://www.npmjs.com/package/express-session
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();

app.use(
  session({
    name: "sid",
    secret: "keyboard cat",
    saveUninitialized: false,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/bilibili",
    }),
    cookie: { httpOnly: true, maxAge: 60 * 1000 * 5 },
  })
);

app.get("/login", (req, res) => {
  let { username, password } = req.query;
  if (username === "admin" && password === "admin") {
    req.session.username = "admin";
    req.session.uid = "admin++++";
    res.send("登录成功");
  } else {
    res.send("登录失败～");
  }
});
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("退出登录成功～");
  });
});
app.get("/cart", (req, res) => {
  if (req.session.username) {
    res.send("登录成功");
  } else {
    res.send("登录失败～");
  }
});
app.listen(9000, () => {
  console.log("app is listen in 9000~~~");
});
