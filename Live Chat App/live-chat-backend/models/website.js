const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});

module.exports = mongoose.model("Website", websiteSchema);
