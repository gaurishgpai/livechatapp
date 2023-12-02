const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.post("/add", messageController.addMessage);
router.get("/get", messageController.getMessage);
router.get("/getvisitorname", messageController.getVisitorName);
module.exports = router;
