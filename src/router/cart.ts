import { Router } from "express";
import {
  addCart,
  getCart,
  updateCartItem,
  toggleSelectAll,
  removeCartItem,
} from "@/controllers/cart";

const router = Router();

router.get("/:userId", getCart);

router.post("/add", addCart);
router.post("/update", updateCartItem);
router.post("/toggle-select", toggleSelectAll);
router.post("/delete", removeCartItem);

export default router;
