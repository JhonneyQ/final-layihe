const express = require("express");
const { createChat, findChat, findUserChat } = require("../controller/chat");

const routercc = express.Router();

routercc.post("/", createChat);
routercc.get("/:userId", findUserChat);
routercc.get("/find/:firstId/:secondId", findChat);


module.exports = routercc;