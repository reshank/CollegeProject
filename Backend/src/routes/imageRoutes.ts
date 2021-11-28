import express from "express";
import { uploadFile, removeFile } from "../controllers/imageController";
import { auth } from "../middlewares/authMiddleware";
import upload from "../utils/multer";

const router = express.Router();

//auth
router.route("/upload").post(auth, upload.single("file"), uploadFile);
router.route("/delete/:id").delete(auth, removeFile);

export default router;
