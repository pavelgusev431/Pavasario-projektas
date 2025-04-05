import express from "express";
import {
  checkFileTypes,
  upload,
  uploadResult,
  getDirectory,
} from "../controllers/uploadController.js";

const uploadRouter = express.Router();

uploadRouter.route("/").get(checkFileTypes);
uploadRouter.route("/dir").post(getDirectory);
uploadRouter.route("/files").post(upload.array("images"), uploadResult);
export default uploadRouter;
