"use strict";
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const createError = require("http-errors");
const userService = require("../services/userService");
require("dotenv").config();

/**
 * Cấu hình Passport với chiến lược Google OAuth để xác thực.
 */
const authController = () => {
  // Cấu hình chiến lược Google OAuth
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID, // ID của client Google OAuth
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Mật khẩu client Google OAuth
        callbackURL: process.env.GOOGLE_REDIRECT_LOGIN, // URL để chuyển hướng sau khi xác thực
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Lấy email từ profile của Google
          const email = profile.emails[0].value;

          // Kiểm tra xem email có thuộc miền cho phép không
          if (!email.endsWith("@vku.udn.vn")) {
            return done(null, false, { message: "Miền email không được phép" });
          }

          // Tìm người dùng theo email
          let user = await userService.findByEmail(email);

          if (!user) {
            // Nếu người dùng không tồn tại, tạo người dùng mới
            const newUser = {
              FULLNAME: profile.displayName, // Tên đầy đủ từ profile Google
              EMAIL: email,
              // Các trường khác như googleId có thể thêm vào nếu cần
            };
            const createUserResponse = await userService.createUser(newUser);
            if (createUserResponse.status === 200) {
              user = createUserResponse.elements;
            } else {
              return done(
                createError.InternalServerError(createUserResponse.message)
              );
            }
          }

          // Trả về người dùng đã xác thực
          return done(null, user);
        } catch (error) {
          return done(error); // Nếu có lỗi, trả lỗi về
        }
      }
    )
  );

  // Cấu hình cách lưu thông tin người dùng vào session
  passport.serializeUser((user, done) => {
    done(null, user); // Lưu toàn bộ đối tượng người dùng vào session
  });

  // Cấu hình cách lấy thông tin người dùng từ session
  passport.deserializeUser((obj, done) => {
    done(null, obj); // Trả lại đối tượng người dùng từ session
  });
};

module.exports = authController;
