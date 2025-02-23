const mongoose = require("mongoose");

const ReelSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  context: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  comments: { type: [String], default: [] }, 
  shares: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("reels", ReelSchema);
