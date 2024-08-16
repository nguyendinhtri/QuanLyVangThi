"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserExam extends Model {
    static associate(models) {
      // Liên kết với bảng Users
      UserExam.belongsTo(models.Users, {
        foreignKey: "USER_ID",
      });

      // Liên kết với bảng Hoc_Phan
      UserExam.belongsTo(models.Hoc_Phan, {
        foreignKey: "HOCPHAN_ID",
      });

      // Liên kết với bảng Lich_Thi
      UserExam.belongsTo(models.Lich_Thi, {
        foreignKey: "LICHTHI_ID",
      });

      // Liên kết với bảng Don_Vang_Thi
      UserExam.belongsTo(models.Don_Vang_Thi, {
        foreignKey: "DONVANGTHI_ID",
      });
    }
  }

  UserExam.init(
    {
      USER_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Phần của khóa chính phức hợp
      },
      HOCPHAN_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Phần của khóa chính phức hợp
      },
      LICHTHI_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Phần của khóa chính phức hợp
      },
      DONVANGTHI_ID: {
        type: DataTypes.INTEGER,
        allowNull: true, // Có thể có hoặc không
      },
    },
    {
      sequelize,
      modelName: "UserExam",
    }
  );

  return UserExam;
};
