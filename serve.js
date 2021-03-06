const express = require("express");
const app = express();
const routers = require("./routers");

app.get("/", function (req, res) {
  res.json("Communication Of Things Serve Project");
});
app.use(routers.authRouter);
app.use(routers.userRouter);
app.use(routers.deviceRouter);

app.use((req, res, next) => {
  res.send("404 NOT FOUND");
});

module.exports = app;
