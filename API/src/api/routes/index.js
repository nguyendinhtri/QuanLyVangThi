const express = require("express");
const createError = require("http-errors");
const logEvents = require("../helpers/logEvents.js");
const { v4: uuid } = require("uuid");
require("dotenv").config();

let router = express.Router();

let initWebRoutes = (app) => {
  router.use("/auth", require("./authRouter.js"));
  router.use("/user", require("./userRouter.js"));
  router.use("/lichThi", require("./lichThiRouter.js"));
  router.use("/donVangThi", require("./donVangThiRouter.js"));

  router.get("/", (req, res) => {
    res.send("hello there !");
  });

  router.use((req, res, next) => {
    next(createError.NotFound("Not Found !"));
  });

  router.use((err, req, res, next) => {
    let contentLog = `idError:${uuid()} --- ${req.url} --- ${req.method} --- ${
      err.message
    }`;
    logEvents(contentLog);
    if (!err.status) {
      err["status"] = 500;
    }
    res.status(err.status).json({
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    });
  });
  return app.use("/api", router);
};

module.exports = initWebRoutes;
