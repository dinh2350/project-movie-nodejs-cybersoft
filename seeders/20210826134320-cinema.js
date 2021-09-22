'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert(
      "Cinemas",
      [
        {
          name: "BHD-3/2",
          address: "1012 3/2",
          image: "https://www.bhdstar.vn/wp-content/uploads/2019/06/BHDStar_Logo_Tron.png",
          cinemaplex_id: 7,
          createdAt: "2021-08-26 00:00:00",
          updatedAt: "2021-08-26 00:00:00",
        },
        {
          name: "BHD-CMT8",
          address: "1012 cmt8",
          image: "https://www.bhdstar.vn/wp-content/uploads/2019/06/BHDStar_Logo_Tron.png",
          cinemaplex_id: 7,
          createdAt: "2021-08-26 00:00:00",
          updatedAt: "2021-08-26 00:00:00",
        },
      ]
    )

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete("Cinemas", null);
  }
};
