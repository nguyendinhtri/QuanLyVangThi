const lichThiController = require("../controllers/lichThiController");
const router = require("express").Router();

router.post("/createLichThi", lichThiController.createLichThi);
router.get("/getAllLichThi", lichThiController.getAllLichThi);

router.get("/getIdLichThi/:id", lichThiController.getIdLichThi);
router.get("/getLichThiByUserId/:userId", lichThiController.getLichThiByUserId);
router.patch("/updateLichThi/:id", lichThiController.updateLichThi);
router.delete("/deleteLichThi/:id", lichThiController.deleteLichThi);

module.exports = router;
