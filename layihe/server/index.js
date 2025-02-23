const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const reelRouter = require("./router/reels")
const champRouter = require("./router/champions")
const userRouter = require("./router/user")
const chatRouter = require("./router/chat")
const messageRouter = require("./router/message")
const post = require("./router/post")
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
const PORT = 8080;

app.use("/api/reels",reelRouter);
app.use("/api/champions",champRouter);
app.use("/api/user",userRouter)
app.use("/api/chat", chatRouter)
app.use("/api/message", messageRouter)
app.use("/api/post", post)


mongoose.connect('mongodb+srv://kananqadirov2005:kanan_2005@cluster0.whn9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log("Connected!");
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  });