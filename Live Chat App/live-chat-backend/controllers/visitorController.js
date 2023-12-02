const Visitor = require("../models/visitor");
const Admin = require("../models/admin");
async function createVisitor(req, res) {
  const { name, email, phone, website_id, platform } = req.body;
  try {
    const result = await Visitor.create({
      name: name,
      email: email,
      phone: phone,
      website_id: website_id,
      status: "notresolved",
      platform: platform,
    });
    const admins = await Admin.find({ website_id: website_id });
    const numAdmins = admins.length;
    const randomIndex = Math.floor(Math.random() * numAdmins);
    console.log(admins);
    const randomAdminId = admins[randomIndex]._id;
    res.status(201).json({
      visitor_id: result._id,
      admin_id: randomAdminId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function getVisitor(req, res) {
  const { id } = req.query;
  try {
    const visitor = await Visitor.findById(id);
    res.json(visitor);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function getAllVisitor(req, res) {
  const { admin_id } = req.query;
  try {
    const admin = await Admin.findById(admin_id);
    const visitor = await Visitor.find({ website_id: admin.website_id });
    res.json(visitor);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function visitorStatus(req, res) {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
      return res.status(404).json({ message: "User not found" });
    }
    Object.assign(visitor, { status: "resolved" });
    await visitor.save();
    res.json(visitor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createVisitor,
  visitorStatus,
  getVisitor,
  getAllVisitor,
};
