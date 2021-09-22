const { Cinema, Cineplex } = require("../models");

const cinemaController = {
  getCinemaList: () => {
    return Cinema.findAll({
      include: [
        {
          model: Cineplex,
        },
      ],
    });
  },

  getCineplexWithCinema: (cineplex) => {
    return Cineplex.findAll(
      {
        include: [
          {
            model: Cinema,
          },
        ],
      },
      {
        where: {
          name: cineplex,
        },
      }
    );
  },
};

module.exports = cinemaController;
