const router            = require("express").Router();
const controller        = require("../controller/mainController")

router.get("/getBmiDetails", controller.getBmiDetails)
router.get("/getCount", controller.getCount)

module.exports = router;