const createError = require("http-errors");
const { uploadFileValidate } = require("../validations/validation");

module.exports.validUploadFile = (req, res, next) => {
  const { error } = uploadFileValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};
