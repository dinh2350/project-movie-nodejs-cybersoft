const express = require("express");
const bcryptjs = require("bcryptjs");
const { getUserByEmail } = require("../controllers/user.controllers");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../helpers/jwt.helpers");
const { RESPONSE_CODE } = require("../constants");

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || !email.trim() || !password.trim())
      res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .send("email and password is required");

    const user = await getUserByEmail(email);

    if (!user)
      return res.status(RESPONSE_CODE.BAD_REQUEST).send("email is not exist");

    const isAuth = bcryptjs.compareSync(password, user.password);

    if (!isAuth)
      return res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .send("password is not match");

    const token = generateToken(user);

    res.status(200).send({ user, token });
  } catch (error) {
    console.log({ error });
    res.status(500).send(error);
  }
});

module.exports = {
  authRouter,
};
