const Website = require("../models/website");
const Admin = require("../models/admin");
async function addWebsite(req, res) {
  const { name, admin_id } = req.body;
  try {
    const result = await Website.create({
      name: name,
      admin_id: admin_id,
    });
    const admin = await Admin.findById(admin_id);
    admin.website_id = result._id;
    await admin.save();
    res.status(201).json({ name: result.name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function getWebsite(req, res) {
  const { id } = req.query;
  try {
    const website = await Website.find({ admin_id: id });
    res.json(website);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
module.exports = { addWebsite, getWebsite };
