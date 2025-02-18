const express = require("express");
const { registerUser, loginUser, findUser, getUsers } = require("../controller/user");
const routeru = express.Router();

routeru.post("/register", registerUser);
routeru.post("/login", loginUser);
routeru.get("/find/:userId", findUser);
routeru.get("/", getUsers);


module.exports = routeru;