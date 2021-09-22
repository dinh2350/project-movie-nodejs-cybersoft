"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Cineplexes", [
      {
        name: "BHD",
        logo: "https://www.bhdstar.vn/wp-content/uploads/2019/06/BHDStar_Logo_Tron.png",
        createdAt: "2021-08-26 00:00:00",
        updatedAt: "2021-08-26 00:00:00",
      },
      {
        name: "CGV",
        logo: "https://upload.wikimedia.org/wikipedia/vi/4/43/CGV_Logo_Global_BI_V9-02.png",
        createdAt: "2021-08-26 00:00:00",
        updatedAt: "2021-08-26 00:00:00",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Cineplexes", null);
  },
};
