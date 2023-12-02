const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  website_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Website",
    required: false,
  },
  phone: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Admin", adminSchema);
