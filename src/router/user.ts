import { Router } from "express";
import { login, register, getUserInfo, getUserList } from "@/controllers/user";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user-info", getUserInfo);
router.get("/list", getUserList);
export default router;
