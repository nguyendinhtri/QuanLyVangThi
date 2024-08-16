const userController = require("../controllers/userController");

const router = require("express").Router();

router.get("/getAllUser", userController.getAllUser);
router.get("/getIdUser/:id", userController.getIdUser);
router.patch("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);
module.exports = router;
