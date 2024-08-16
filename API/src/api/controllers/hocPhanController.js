const createSuccess = require("../helpers/createSuccess");
const db = require("../models");
const createError = require("http-errors");
const hocPhanService = require("../services/hocPhanService");

const hocPhanController = {
  createHocPhan: async (req, res, next) => {
    try {
      const { status, message, elements } = await hocPhanService.createHocPhan(
        req.body
      );
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getAllHocPhan: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await hocPhanService.getAllHocPhan();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getAllByQueryHocPhan: async (req, res, next) => {
    try {
      const query = req.body;
      const { status, message, elements } =
        await hocPhanService.getAllByQueryHocPhan(query);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getIdHocPhan: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } = await hocPhanService.getIdHocPhan(
        id
      );
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getHocPhanByUserId: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { status, message, elements } =
        await hocPhanService.getHocPhanByUserId(userId);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateHocPhan: async (req, res, next) => {
    try {
      const { id } = req.params;
      const isCheck = await db.Hoc_Phan.findOne({
        where: {
          id: id,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");

      const { status, message } = await hocPhanService.updateHocPhan(
        req.body,
        id
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteHocPhan: async (req, res, next) => {
    try {
      const { id } = req.params;
      const isCheck = await db.Hoc_Phan.findOne({
        where: {
          id: id,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await hocPhanService.deleteHocPhan(id);
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = hocPhanController;
