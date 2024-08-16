const authController = require("../controllers/authController");
const passport = require("passport");
const router = require("express").Router();

// Khởi tạo cấu hình Passport
authController();
// Route để bắt đầu quá trình xác thực với Google
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
// Route để xử lý callback từ Google
router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Profile người dùng hiện có sẵn trong req.user
    const user = req.user;
    // Chuyển hướng người dùng đến URL sau khi đăng nhập thành công
    res.redirect(`${process.env.URL_CLIENT}/loginsuccess/${user.id}`);
  }
),
  router.get("/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });

module.exports = router;
