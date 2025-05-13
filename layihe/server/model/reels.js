const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  text: { type: String, required: true } // Fix the field name
}, { timestamps: true });

const ReelSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  context: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  comments: { type: [CommentSchema], default: [] }, // Array of comment objects
  shares: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  likers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
}, { timestamps: true });

module.exports = mongoose.model("reels", ReelSchema);
