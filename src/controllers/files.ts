import { IMG_TYPE_LIST, IMG_LIMIT, ResCode, BASE_URL } from "@/constant";
import { RequestHandler } from "express";
import multer from "multer";
import path from "node:path";
console.log("import.meta.url", import.meta.url);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.log("file", file);

    if (IMG_TYPE_LIST.includes(path.extname(file.originalname))) {
      cb(null, path.resolve("./public/upload"));
    } else {
      cb(
        new Error("仅支持 jpg/png/gif 格式的图片！"),
        path.resolve("./public/upload")
      );
    }
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: IMG_LIMIT,
  },
});

export const uploadImage: RequestHandler = (req, res) => {
  console.log("req.body", req.body);
  console.log("req.file", req.file);

  const url = BASE_URL + "/upload/" + req.file!.filename;
  res.send({
    msg: "success",
    data: {
      url,
    },
    code: ResCode.SUCCESS,
  });
};
