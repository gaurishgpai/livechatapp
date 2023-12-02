const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const Website = require("../models/website");
const Visitor = require("../models/visitor");

async function createAdmin(req, res) {
  const { name, phone, role, email, password } = req.body;
  try {
    const existingUser = await Admin.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await Admin.create({
      name: name,
      role: role,
      phone: phone,
      email: email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: email, id: result._id },
      process.env.JWT_SECRET,
      { expiresIn: "5h", algorithm: "HS256" }
    );
    res.status(201).json({
      token: token,
      email: result.email,
      role: result.role,
      admin_id: result._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email: email });
    if (!existingAdmin) {
      return res.status(404).json({ message: "user not exist" });
    }
    bcrypt.compare(password, existingAdmin.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          { email: email, id: existingAdmin._id },
          process.env.JWT_SECRET,
          { expiresIn: "5h", algorithm: "HS256" }
        );
        res.status(201).json({
          token: token,
          role: existingAdmin.role,
          email: existingAdmin.email,
          admin_id: existingAdmin._id,
        });
      } else {
        return res.status(401).json({ message: "Authentication failed" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getEmployee(req, res) {
  const { id } = req.query;
  try {
    const employee = await Admin.find({ website_id: id, role: "employee" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
async function deleteAdmin(req, res) {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (admin.website_id === "") {
      await admin.deleteOne();
    } else {
      await Admin.deleteMany({ website_id: admin.website_id });

      const website = await Website.findById(admin.website_id);
      if (!website) {
        return res.status(404).json({ message: "Website not found" });
      }

      await website.deleteOne();

      const visitors = await Visitor.find({ website_id: admin.website_id });
      await Visitor.deleteMany({ website_id: admin.website_id });
    }

    res
      .status(200)
      .json({ message: "Admin and related documents deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createEmployee(req, res) {
  const { name, phone, role, email, password, website_id } = req.body;
  try {
    const existingUser = await Admin.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await Admin.create({
      name: name,
      role: role,
      phone: phone,
      email: email,
      website_id: website_id,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "employee created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = {
  createAdmin,
  getEmployee,
  deleteAdmin,
  createEmployee,
  login,
};
