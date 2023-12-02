const express = require("express");
const router = express.Router();
const websiteController = require("../controllers/websiteController");

router.post("/add", websiteController.addWebsite);
router.get("/getwebsite", websiteController.getWebsite);
module.exports = router;
