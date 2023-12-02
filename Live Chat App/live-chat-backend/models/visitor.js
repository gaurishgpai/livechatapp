const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  name: { type: String, required: false },
  website_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Website",
    required: true,
  },
  platform: { type: String, required: false },
  phone: { type: Number, required: false, default: null },
  email: { type: String, required: false, default: null },
  read: { type: Boolean, required: false },
  status: { type: String, enum: ["resolved", "notresolved"] },
});

module.exports = mongoose.model("Visitor", visitorSchema);
