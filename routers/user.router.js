"use strict";
const express = require("express");
const bcryptjs = require("bcryptjs");
const {
  getListUser,
  createUser,
  getUserById,
  deleteUserById,
  updateUserById,
  uploadAvatar,
} = require("../controllers/user.controllers");
const { RESPONSE_CODE } = require("../constants");
const {
  authenticate,
  authorize,
} = require("../middlewares/verify-token.middleware");
const { upLoadAvatarMiddleware } = require("../middlewares/upload-image.middlewares");

const userRouters = express.Router();

userRouters.get(
  "/",
  authenticate,
  authorize("ADMIN", "QL"),
  async (req, res) => {
    try {
      const userList = await getListUser();
      res.send(userList).status(200);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

userRouters.post("/avatar", authenticate, upLoadAvatarMiddleware(), async (req, res) => {
  try {
    const userId = req.user.id;

    const { file } = req;

    // TODO: change domain
    const avatarUrl = "http://localhost:3000/" + file.path;

    await uploadAvatar(userId, avatarUrl);

    res.send("upload avatar ok").status(200);
  } catch (error) {
    res.send("upload file error").status(RESPONSE_CODE.INTERNAL_SERVER_ERROR);
  }
});

userRouters.get("/:id", async (req, res) => {
  try {
    const userId = Number(req.params.id);
    if (!userId) return res.status(400).send("invalid user id");

    const user = await getUserById(userId);

    if (!user) return res.status(400).send(`user id ${userId} is not exist`);

    console.log(JSON.stringify(user));

    res.send(user).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouters.delete("/:id", authenticate, async (req, res) => {
  try {
    const userId = Number(req.params.id);
    if (!userId) return res.status(400).send("invalid user id");

    const user = await getUserById(userId);

    if (!user) return res.status(400).send(`user id ${userId} is not exist`);

    // cach khac de tra loi ve cho FE
    // if (!user) throw new Error(`user id ${userId} is not exist`);

    await deleteUserById(userId);

    res.send("user have been deleted").status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouters.post("/", async (req, res) => {
  try {
    const { name, email, phone_number, password, role } = req.body;

    const salt = bcryptjs.genSaltSync();

    const hasPassword = bcryptjs.hashSync(password, salt);

    const newUser = { name, email, phone_number, password: hasPassword, role };
    const user = await createUser(newUser);

    res.send(user).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouters.patch("/:id", async (req, res) => {
  try {
    const userId = Number(req.params.id);
    if (!userId) return res.status(400).send("invalid user id");

    const user = await getUserById(userId);

    if (!user) return res.status(400).send(`user id ${userId} is not exist`);

    const { name, email, phone_number, password, role } = req.body;

    const newUser = { name, email, phone_number, password, role };

    await updateUserById(userId, newUser);

    res.send({ ...newUser, id: userId }).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = {
  userRouters,
};
