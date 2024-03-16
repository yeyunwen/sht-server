import express from "express";
import { upload, uploadImage } from "@/controllers/files";

const router = express.Router();

router.post("/image", upload.single("file"), uploadImage);

export default router;
