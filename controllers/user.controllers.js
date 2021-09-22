const { User } = require("../models");

const getListUser = () => {
  return User.findAll();
};

const createUser = (newUser) => {
  return User.create(newUser);
};

const getUserById = (id) => {
  return User.findByPk(id);
};

const getUserByEmail = (email) => {
  return User.findOne({
    where: { email },
  });
};

const deleteUserById = (id) => {
  return User.destroy({
    where: {
      id,
    },
  });
};

const updateUserById = (userId, newUser) => {
  return User.update(newUser, {
    where: {
      id: userId,
    },
  });
};

const uploadAvatar = (userId, avataUrl) => {
  return User.update({ avatar: avataUrl }, { where: { id: userId } });
};

module.exports = {
  getListUser,
  createUser,
  getUserById,
  deleteUserById,
  updateUserById,
  getUserByEmail,
  uploadAvatar,
};
