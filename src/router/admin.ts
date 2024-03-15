import { Router } from "express";
import { login, register, getUserInfo } from "@/controllers/admin";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user-info", getUserInfo);

export default router;
