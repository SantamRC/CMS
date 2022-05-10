require('dotenv')
const express=require('express')
const app = express()
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const port = 8080 || process.env.PORT;

app.use(express.json());
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("<h1>Working App </h1>");
});

const conn = mongoose.createConnection(process.env.MONGODB_URI);

conn.once("open", () => {
  var gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("cms");
});

app.listen(port, () => {
  console.log("Listening on Port " + port);
}); 