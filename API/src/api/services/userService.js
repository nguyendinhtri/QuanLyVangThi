const db = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const createError = require("http-errors");
const { Op, QueryTypes } = require("sequelize");

const userService = {
  createUser: async (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Users.create({
          ...user,
        });

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create user successfully!"
            : "Error while creating user",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  findByEmail: (email) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Users.findOne({ where: { email } });
        resolve({
          status: response ? 200 : 404,
          message: response ? "User found successfully!" : "User not found",
          elements: response,
        });
      } catch (error) {
        reject(
          createError.InternalServerError("Error while finding user by email")
        );
      }
    });
  },
  updateUser: async (userId, userData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Users.update(userData, {
          where: {
            id: userId,
          },
        });
        if (response[0] === 0) {
          resolve({
            status: 404,
            message: "User not found or already deleted",
          });
        } else {
          await logUpdate("Users", { id: userId, ...userData }); // Log update if needed
          resolve({
            status: 200,
            message: "Update user successfully!",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteUser: async (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Users.destroy({
          where: {
            id: userId,
          },
        });
        if (response[0] === 0) {
          resolve({
            status: 404,
            message: "User not found or already deleted",
          });
        } else {
          resolve({
            status: 200,
            message: "Delete user successfully!",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllUser: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Users.findAll({});
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get list user successfully"
            : "Error while getting list user",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIdUser: async (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Users.findOne({
          where: {
            id: userId,
          },
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get student with exam schedule successfully"
            : "Error while getting student with exam schedule",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = userService;
