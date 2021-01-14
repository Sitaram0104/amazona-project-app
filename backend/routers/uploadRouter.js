import express from "express";
import multer from "multer";
import { isAuth } from "../util.js";
import path from "path";

const uploadRouter = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage }).single("image");

uploadRouter.post("/", isAuth, upload, (req, res) => {
  res.send(`/${req.file.path}`);
});

export default uploadRouter;
