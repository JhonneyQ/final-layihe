const mongoose = require("mongoose");
const ReelBlog = require("../model/reels");
const multer = require("multer");



const uploadReel = async (req, res) => {
  try {
    console.log("Received file:", req.file);
    console.log("Received body:", req.body);

    if (!req.file || !req.body.context) {
      return res.status(400).json({ success: false, message: "Missing video or context" });
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.creator)) {
      return res.status(400).json({ success: false, message: "Invalid creator ID" });
    }

    const newReel = new ReelBlog({
      videoUrl: req.file.path,
      creator: new mongoose.Types.ObjectId(req.body.creator),
      context: req.body.context, // ✅ Save context in the database
      comments: [],
      shares: 0,
      likes: 0,
    });

    await newReel.save();

    res.status(201).json({
      success: true,
      message: "Video uploaded successfully!",
      data: newReel,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: "Upload failed", error: error.message });
  }
};

// Fetch all reels
const getAllReels = async (req, res) => {
  try {
    const reels = await ReelBlog.find();

    res.status(200).json({
      success: true,
      data: reels,
      message: "Reels fetched successfully!",
    });
  } catch (error) {
    console.error("Error fetching reels:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

const getReelsById = async (req, res) => {
  try {
    const reel = await ReelBlog.findById(req.params.id);
    if (!reel) {
      return res.status(404).json({ success: false, message: "Reel not found" });
    }

    res.status(200).json({ success: true, data: reel, message: "Reel fetched successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const deleteReels = async (req, res) => {
  try {
    const deletedReel = await ReelBlog.findByIdAndDelete(req.params.id);
    if (!deletedReel) {
      return res.status(404).json({ success: false, message: "Reel not found" });
    }

    res.status(200).json({ success: true, message: "Reel deleted successfully!", data: deletedReel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Edit a reel
const editReels = async (req, res) => {
  try {
    const updatedReel = await ReelBlog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReel) {
      return res.status(404).json({ success: false, message: "Reel not found" });
    }

    res.status(200).json({ success: true, message: "Reel updated successfully!", data: updatedReel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const like = async (req, res) => {
  try {
    const { userId } = req.body;
    const { reelId } = req.body;


    if (userId === reelId) {
      return res.status(400).json({ message: "You can't follow yourself!" });
    }



    await ReelBlog.updateOne(
      { _id: reelId },
      { $addToSet: { likers: userId } }
    );

    res.status(200).json({ message: "User followed successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const unlike = async (req, res) => {
  try {
    const { userId } = req.body;
    const { reelId } = req.body;



    await ReelBlog.updateOne(
      { _id: reelId },
      { $pull: { likers: userId } }
    );

    res.status(200).json({ message: "User unfollowed successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const addComment = async (req, res) => {
  try {
    const { reelId, text, userId } = req.body;
     // Assuming you have authentication middleware

    console.log("Request Body:", req.body); // Log the request payload

    if (!reelId || !userId || !text) {
      console.error("Missing required fields:", { reelId, text });
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    const reel = await ReelBlog.findById(reelId);
    if (!reel) {
      console.error("Reel not found for ID:", reelId);
      return res.status(404).json({ success: false, message: "Reel not found." });
    }

    // Add the new comment
    
    reel.comments.push({ user: userId, text: text });

    await reel.save();
   
    res.status(200).json({ success: true, message: "Comment added!",data:reel.comments });
  } catch (error) {
    console.error("Error in addComment:", error); // Log the full error
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  uploadReel,  // ✅ Fixed missing export
  getAllReels,
  getReelsById,
  deleteReels,
  editReels,
  like,
  unlike,
  addComment
};
