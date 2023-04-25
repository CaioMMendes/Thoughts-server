import { Router } from "express";
import * as authController from "../controllers/authController";

const router = Router();

router.get("/register", authController.register);
router.get("/login", authController.login);
router.get("/logout", authController.logout);
export default router;
