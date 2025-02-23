const express = require("express");
const { registerUser, loginUser, findUser, getUsers, followUser, unfollowUser, update } = require("../controller/user");
const routeru = express.Router();

routeru.post("/register", registerUser);
routeru.post("/login", loginUser);
routeru.get("/find/:userId", findUser);
routeru.get("/", getUsers);
routeru.post("/follow", followUser);
routeru.post("/unfollow", unfollowUser);
routeru.post("/reel", update);


module.exports = routeru;