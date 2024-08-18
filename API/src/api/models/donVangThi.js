"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Don_Vang_Thi extends Model {
    static associate(models) {
      Don_Vang_Thi.belongsTo(models.Users, {
        foreignKey: "USER_ID",
        allowNull: false,
      });
      Don_Vang_Thi.hasMany(models.Lich_Thi, {
        foreignKey: "DONVANGTHI_ID",
        allowNull: false,
      });
    }
  }
  Don_Vang_Thi.init(
    {
      NGAY_GUI: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      LY_DO_VANG_THI: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      TRANG_THAI: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Chờ duyệt",
      },
      LY_DO_TU_CHOI: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      MINH_CHUNG: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Don_Vang_Thi",
    }
  );

  return Don_Vang_Thi;
};
