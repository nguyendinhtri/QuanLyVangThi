const createSuccess = require("../helpers/createSuccess");
const db = require("../models");
const createError = require("http-errors");
const userService = require("../services/userService");
const userController = {
  getAllUser: async (req, res, next) => {
    try {
      const { status, message, elements } = await userService.getAllUser();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getIdUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } = await userService.getIdUser(id);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const userData = req.body;
      const isCheck = await db.Users.findOne({
        where: {
          id: id,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await userService.updateUser(id, userData);
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const isCheck = await db.Users.findOne({
        where: {
          id: id,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await userService.deleteUser(id);
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
