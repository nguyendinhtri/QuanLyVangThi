"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lich_Thi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lich_Thi.belongsTo(models.Users, {
        foreignKey: "USER_ID",
      });
      Lich_Thi.hasMany(models.UserExam, {
        foreignKey: "LICHTHI_ID",
      });
    }
  }
  Lich_Thi.init(
    {
      HINH_THUC_THI: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      NGAY_THI: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      GIO_THI: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      PHONG_THI: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Lich_Thi",
    }
  );
  return Lich_Thi;
};
