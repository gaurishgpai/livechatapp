const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/registration", adminController.createAdmin);
router.post("/login", adminController.login);
router.get("/getemployee", adminController.getEmployee);
router.post("/createemployee", adminController.createEmployee);
router.delete("/delete/:id", adminController.deleteAdmin);
module.exports = router;
