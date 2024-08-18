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

      Lich_Thi.belongsTo(models.Don_Vang_Thi, {
        foreignKey: "DONVANGTHI_ID",
      });
    }
  }
  Lich_Thi.init(
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
