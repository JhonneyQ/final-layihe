const express = require("express");
const { getAllReels, getReelsById, deleteReels, editReels, uploadReel, like, unlike, addComment } = require("../controller/reels");
const { upload } = require("../config/multerConfig"); 

const router = express.Router();

router.get("/", getAllReels);
router.get("/:id", getReelsById);
router.delete("/:id", deleteReels);
router.put("/:id", editReels);
router.post("/upload", upload.single("video"), uploadReel);  
router.post("/like", like);
router.post("/unlike", unlike);
router.post("/addComment", addComment);

module.exports = router;
