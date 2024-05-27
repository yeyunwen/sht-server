import express from "express";
import {
  getList,
  getListByName,
  addProduct,
  updateProduct,
  getProductDetail,
  deleteProduct,
  getRecommendProduct,
} from "@/controllers/product";

const router = express.Router();

router.get("/list", getList);
router.get("/detail/:id", getProductDetail);
router.get("/recommend", getRecommendProduct);
router.get("/search", getListByName);

router.post("/add", addProduct);
router.post("/update", updateProduct);
router.post("/delete", deleteProduct);

export default router;
