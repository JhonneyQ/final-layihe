const express = require("express");
const { getAllChampions, getChampionsById, deleteChampions, editChampions, postChampions } = require("../controller/champions");
const routerc = express.Router();

router.get("/", getAllChampions);
router.get("/:id", getChampionsById);
router.delete("/:id", deleteChampions);
router.put("/:id", editChampions);
router.post("/", postChampions);

module.exports = routerc;