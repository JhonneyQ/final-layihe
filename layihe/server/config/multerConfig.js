const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "reels",
    resource_type: "video",
    allowed_formats: ["mp4", "mov", "avi"],
  },
});

const upload = multer({ storage });

module.exports = { upload };
