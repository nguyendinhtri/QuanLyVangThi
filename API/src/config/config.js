require("dotenv").config();
const mysql2 = require("mysql2");
const fs = require("fs");

module.exports = {
  config: {
    development: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      dialect: "mysql",
      dialectModule: mysql2,
      logging: false,
      port: process.env.DB_PORT,
    },
  },
};
