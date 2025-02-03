const express = require("express");
const { getAllReels, getReelsById, deleteReels, editReels, postReel } = require("../controller/reels");
const router = express.Router();

router.get("/", getAllReels);
router.get("/:id", getReelsById);
router.delete("/:id", deleteReels);
router.put("/:id", editReels);
router.post("/", postReel);

module.exports = router;