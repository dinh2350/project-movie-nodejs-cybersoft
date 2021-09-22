const express = require("express");
const { RESPONSE_CODE } = require("../constants");
const cinemaCtr = require("../controllers/cinema.controller");

const cinemaRouter = express.Router();

cinemaRouter.get("/", async (req, res) => {
  try {
    const cinemaList = await cinemaCtr.getCinemaList();

    res.status(RESPONSE_CODE.OK).send(cinemaList);
  } catch (error) {
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
});

cinemaRouter.get("/with-cineplex", async (req, res) => {
  try {
    const { cineplex = "" } = req.query;

    console.log(req.query);

    // TODO: check cineplex co ton tai hay khong

    const cineplexList = await cinemaCtr.getCineplexWithCinema(cineplex);

    res.status(RESPONSE_CODE.OK).send(cineplexList);
  } catch (error) {
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
});

module.exports = {
  cinemaRouter,
};
