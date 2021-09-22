const express = require("express");
const { authRouter } = require("./auth.routers");
const { cinemaRouter } = require("./cinema.router");
const { userRouters } = require("./user.router");
const rootRouter = express.Router();

rootRouter.use("/user", userRouters);
rootRouter.use("/auth", authRouter);
rootRouter.use("/cinema", cinemaRouter);

module.exports = {
  rootRouter,
};
