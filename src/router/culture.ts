import express from "express";
import {
  getList,
  addCulture,
  updateCulture,
  getCultureDetail,
  deleteCulture,
  getRecommendCulture,
} from "@/controllers/culture";

const router = express.Router();

router.get("/list", getList);
router.get("/detail/:id", getCultureDetail);
router.get("/recommend", getRecommendCulture);

router.post("/add", addCulture);
router.post("/update", updateCulture);
router.post("/delete", deleteCulture);

export default router;
