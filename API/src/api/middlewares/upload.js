const multer = require("multer");
const moment = require("moment");

require("dotenv").config();

const uploadMinhChungStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./" + process.env.UPLOADED_FOLDER + "/minhchung"); // Thay đổi thư mục lưu trữ
  },
  filename: function (req, file, callback) {
    const filename = `${moment(new Date()).format("YYYYMMDDHHmmss")}_${
      file.originalname
    }`;
    callback(null, filename);
  },
});

const uploadMinhChung = multer({
  storage: uploadMinhChungStorage,
  fileFilter: (req, file, cb) => {
    if (!/[^\u0000-\u00ff]/.test(file.originalname)) {
      file.originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
    }
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/heif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new Error("Only .png, .jpg, .jpeg, and .heif formats are allowed!")
      );
    }
  },
});

module.exports = {
  uploadMinhChung,
};
