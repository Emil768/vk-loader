const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("default/img"));

const PORT = 3001;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).array("file");

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      let newFiles = {};

      const extensions = [
        {
          value: [".txt", ".docx", ".pdf", ".accdb", ".doc", ".ppt"],
          src: "img/text.png",
        },
        {
          value: [".rar", ".zip"],
          src: "img/winrar.png",
        },
        {
          value: [".mp4"],
          src: "img/video.png",
        },
        {
          value: [".gif", ".png", ".webp"],
        },
      ];

      const files = req.files.map((item) => {
        newFiles = item;
        newFiles["ext"] = path.extname(item.originalname);
        newFiles["rnId"] = Math.floor(Math.random() * 1000);

        extensions.map((item) => {
          if (item.value.includes(newFiles.ext)) {
            newFiles.src = item.src;
            if (!item.src) {
              newFiles.src = newFiles.filename;
            }
          }
        });

        return newFiles;
      });

      res.status(200).send(files);
    }
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log("App started on port 8080...");
});
