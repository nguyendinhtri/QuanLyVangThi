const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const db = require(`../models`);

const authController = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8345/api/auth/google/redirect",
      },
      async function (accessToken, refreshToken, profile, cb) {
        const email = profile.emails[0]?.value;
        if (!email.endsWith("@vku.udn.vn")) {
          return cb(null, false, { message: "Miền email không được phép" });
        }
        try {
          if (email) {
            await db.Users.findOrCreate({
              where: { EMAIL: email },
              defaults: {
                FULLNAME: profile.displayName,
                EMAIL: email,
              },
            });
          }
        } catch (error) {
          console.error("Error in findOrCreate:", error);
        }
        return cb(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
};

module.exports = { authController };
