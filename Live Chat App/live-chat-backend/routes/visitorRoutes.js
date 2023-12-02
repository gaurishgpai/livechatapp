const express = require("express");
const router = express.Router();
const visitorController = require("../controllers/visitorController");
const { route } = require("./adminRoutes");

router.post("/registration", visitorController.createVisitor);
router.get("/getvisitor", visitorController.getVisitor);
router.put("/updatestatus/:id", visitorController.visitorStatus);
router.get("/getallvisitors", visitorController.getAllVisitor);
module.exports = router;
