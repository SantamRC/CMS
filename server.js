require('dotenv')
const express=require('express')
const app = express()
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const port = 8080 || process.env.PORT;

app.use(express.json());
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("<h1>Working App </h1>");
});

const conn = mongoose.createConnection("mongodb://localhost:27017");

conn.once("open", () => {
  var gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("cms");
});

var storage = new GridFsStorage({
  url: "mongodb://localhost:27017",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "cms",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
});

app.listen(port, () => {
  console.log("Listening on Port " + port);
}); 