const express = require("express");
const { createMessage, getMessages } = require("../controller/message");


const routerm = express.Router();

routerm.post("/", createMessage);
routerm.get("/:chatId", getMessages);



module.exports = routerm;