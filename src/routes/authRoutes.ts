import { Router } from "express";
import * as authController from "../controllers/authController";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/userInfo", authController.userInfo);
router.post("/logout", authController.logout);
export default router;