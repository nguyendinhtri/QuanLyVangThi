"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hoc_Phan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      Hoc_Phan.hasMany(models.UserExam, {
        foreignKey: "HOCPHAN_ID",
      });
    }
  }
  Hoc_Phan.init(
    {
      TEN_HOC_PHAN: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      GIANG_VIEN: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      SO_TIN_CHI: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Hoc_Phan",
    }
  );
  return Hoc_Phan;
};
