const hocPhanController = require("../controllers/hocPhanController");
const router = require("express").Router();

router.post("/createHocPhan", hocPhanController.createHocPhan);
router.get("/getAllHocPhan", hocPhanController.getAllHocPhan);
router.post("/getAllByQueryHocPhan", hocPhanController.getAllByQueryHocPhan);
router.get("/getIdHocPhan/:id", hocPhanController.getIdHocPhan);
router.get("/getHocPhanByUserId/:userId", hocPhanController.getHocPhanByUserId);
router.patch("/updateHocPhan/:id", hocPhanController.updateHocPhan);
router.delete("/deleteHocPhan/:id", hocPhanController.deleteHocPhan);

module.exports = router;
