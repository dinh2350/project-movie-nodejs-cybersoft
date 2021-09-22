"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "avatar", Sequelize.STRING(1000));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "avatar");
  },
};
