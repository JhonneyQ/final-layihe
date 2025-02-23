const express = require("express");
const { getAllReels, getReelsById, deleteReels, editReels, uploadReel } = require("../controller/reels");
const { upload } = require("../config/multerConfig"); 

const router = express.Router();

router.get("/", getAllReels);
router.get("/:id", getReelsById);
router.delete("/:id", deleteReels);
router.put("/:id", editReels);
router.post("/upload", upload.single("video"), uploadReel);  

module.exports = router;
