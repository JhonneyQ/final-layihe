const express = require("express");
const { getAllChampions, getChampionsById, deleteChampions, editChampions, postChampions } = require("../controller/champions");
const routerc = express.Router();

routerc.get("/", getAllChampions);
routerc.get("/:id", getChampionsById);
routerc.delete("/:id", deleteChampions);
routerc.put("/:id", editChampions);
routerc.post("/", postChampions);

module.exports = routerc;