const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const reelRouter = require("./router/reels")
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 8080;

app.use("/api/reels",reelRouter);

mongoose.connect('mongodb+srv://kananqadirov2005:kanan_2005@cluster0.whn9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log("Connected!");
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  });