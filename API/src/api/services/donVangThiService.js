const db = require("../models");
const createError = require("http-errors");

const donVangThiService = {
  createDonVangThi: async (donVangThi) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Don_Vang_Thi.create({
          ...donVangThi,
        });

        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Create DonVangThi successfully!"
            : "Error while creating DonVangThi",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllDonVangThi: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Don_Vang_Thi.findAll({
          include: [
            {
              model: db.Users, // Bao gồm thông tin lịch thi liên quan
              include: [
                {
                  model: db.Lich_Thi, // Bao gồm thông tin lịch thi liên quan
                },
              ],
            },
          ],
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get list of DonVangThi successfully"
            : "Error while getting list of DonVangThi",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  getIdDonVangThi: async (donVangThiId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Don_Vang_Thi.findOne({
          where: {
            id: donVangThiId,
          },
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Get DonVangThi by ID successfully"
            : "Error while getting DonVangThi by ID",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getDonVangThiByUserId: async (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db.Users.findOne({
          where: {
            id: userId,
          },
          attributes: ["MSV", "FULLNAME"],
          include: [
            {
              model: db.Don_Vang_Thi,
              include: [
                {
                  model: db.Lich_Thi, // Bao gồm thông tin lịch thi liên quan
                },
              ],
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
          message: "Get DonVangThi by User ID successfully",
          elements: {
            userInfo: {
              FULLNAME: user.FULLNAME,
              MSV: user.MSV,
            },
            donVangThi: user.Don_Vang_This, // Array of Don_Vang_Thi records
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  updateDonVangThi: async (donVangThi, donVangThiId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Don_Vang_Thi.update(
          {
            ...donVangThi,
          },
          {
            where: {
              id: donVangThiId,
            },
          }
        );
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Update DonVangThi successfully"
            : "Error while updating DonVangThi",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteDonVangThi: async (donVangThiId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.Don_Vang_Thi.destroy({
          where: {
            id: donVangThiId,
          },
        });
        resolve({
          status: response ? 200 : 404,
          message: response
            ? "Delete DonVangThi successfully"
            : "Error while deleting DonVangThi",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  uploadMinhChung: async (DONVANGTHI_ID, uploadFile) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Kiểm tra xem đơn vắng thi có tồn tại không
        const existDonVangThi = await db.Don_Vang_Thi.findOne({
          where: {
            id: DONVANGTHI_ID,
          },
        });
        if (!existDonVangThi)
          throw createError.NotFound("Don Vang Thi not found");

        const uploadMinhChung = await db.Don_Vang_Thi.update(
          {
            MINH_CHUNG: uploadFile.filename,
          },
          {
            where: { id: DONVANGTHI_ID },
          }
        );
        resolve({
          status: 200,
          message: "Upload minh chứng thành công",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = donVangThiService;
