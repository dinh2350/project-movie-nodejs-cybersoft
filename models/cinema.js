"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cinema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Cineplex, {
        foreignKey: "cinemaplex_id",
      });
    }
  }
  Cinema.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      image: DataTypes.STRING,
      cinemaplex_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cinema",
    }
  );
  return Cinema;
};
