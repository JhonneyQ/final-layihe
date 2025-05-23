const express = require("express");
const { registerUser, loginUser, findUser, getUsers, followUser, unfollowUser,  addToFavorites, delFavorites, addSaved, delSaved, toggleBanStatus } = require("../controller/user");
const routeru = express.Router();

routeru.post("/register", registerUser);
routeru.post("/login", loginUser);
routeru.get("/find/:userId", findUser);
routeru.get("/", getUsers);
routeru.post("/follow", followUser);
routeru.post("/unfollow", unfollowUser);
routeru.post("/reel/add", addToFavorites);
routeru.post("/reel/del", delFavorites);
routeru.post("/reel/save", addSaved);
routeru.post("/reel/sdel", delSaved);
routeru.post("/ban/user", toggleBanStatus);


module.exports = routeru;