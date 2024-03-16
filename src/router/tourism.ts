import express from "express";
import {
  getList,
  addTourism,
  updateTourism,
  getTourismDetail,
  deleteTourism,
} from "@/controllers/tourism";

const router = express.Router();

router.get("/list", getList);
router.get("/detail/:tourismId", getTourismDetail);

router.post("/add", addTourism);
router.post("/update", updateTourism);
router.post("/delete", deleteTourism);

export default router;
