const createSuccess = require("../helpers/createSuccess");
const db = require("../models");
const createError = require("http-errors");
const donVangThiService = require("../services/donVangThiService");

const donVangThiController = {
  createDonVangThi: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await donVangThiService.createDonVangThi(req.body);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getAllDonVangThi: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await donVangThiService.getAllDonVangThi();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getAllByQueryDonVangThi: async (req, res, next) => {
    try {
      const query = req.body;
      const { status, message, elements } =
        await donVangThiService.getAllByQueryDonVangThi(query);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getIdDonVangThi: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } =
        await donVangThiService.getIdDonVangThi(id);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getDonVangThiByUserId: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { status, message, elements } =
        await donVangThiService.getDonVangThiByUserId(userId);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateDonVangThi: async (req, res, next) => {
    try {
      const { id } = req.params;
      const isCheck = await db.Don_Vang_Thi.findOne({
        where: {
          id: id,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");

      const { status, message } = await donVangThiService.updateDonVangThi(
        req.body,
        id
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteDonVangThi: async (req, res, next) => {
    try {
      const { id } = req.params;
      const isCheck = await db.Don_Vang_Thi.findOne({
        where: {
          id: id,
        },
      });
      if (!isCheck) throw createError.Conflict("id not exists");
      const { status, message } = await donVangThiService.deleteDonVangThi(id);
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = donVangThiController;
