const db = require("../models");
const createError = require("http-errors");

const hocPhanService = {
  createHocPhan: async (hocPhan) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Hoc_Phan.create({
          ...hocPhan,
        });

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create HocPhan successfully!"
            : "Error while creating HocPhan",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllHocPhan: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Hoc_Phan.findAll({});
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get list of HocPhan successfully"
            : "Error while getting list of HocPhan",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllByQueryHocPhan: async (query) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Hoc_Phan.findAll({
          where: {
            ...query,
          },
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get list of HocPhan successfully by query"
            : "Error while getting list of HocPhan by query",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIdHocPhan: async (hocPhanId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Hoc_Phan.findOne({
          where: {
            id: hocPhanId,
          },
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get HocPhan by ID successfully"
            : "Error while getting HocPhan by ID",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getHocPhanByUserId: async (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db.Users.findOne({
          where: {
            id: userId,
          },
          attributes: ["MSV", "FULLNAME"],
          include: [
            {
              model: db.Hoc_Phan,
            },
          ],
        });
        if (!user) {
          return resolve({
            status: 404,
            message: "User not found",
            elements: [],
          });
        }
        resolve({
          status: 200,
          message: "Get HocPhan by User ID successfully",
          elements: {
            userInfo: {
              FULLNAME: user.FULLNAME,
              MSV: user.MSV,
            },
            hocPhan: user.Hoc_Phans, // Array of Hoc_Phan  records
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateHocPhan: async (hocPhan, hocPhanId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Hoc_Phan.update(
          {
            ...hocPhan,
          },
          {
            where: {
              id: hocPhanId,
            },
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Update HocPhan successfully"
            : "Error while updating HocPhan",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteHocPhan: async (hocPhanId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Hoc_Phan.destroy({
          where: {
            id: hocPhanId,
          },
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Delete HocPhan successfully"
            : "Error while deleting HocPhan",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = hocPhanService;
