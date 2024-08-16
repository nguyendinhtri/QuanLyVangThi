"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasOne(models.Lich_Thi, {
        foreignKey: "USER_ID",
      });
      Users.hasMany(models.Don_Vang_Thi, {
        foreignKey: "USER_ID",
      });
      Users.hasMany(models.UserExam, {
        foreignKey: "USER_ID",
      });
    }
  }
  Users.init(
    {
      MSV: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      FULLNAME: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      EMAIL: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      PHONE: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
