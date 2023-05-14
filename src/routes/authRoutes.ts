import { Router } from "express";
import * as authController from "../controllers/authController";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/userInfo", authController.userInfo);
router.post("/logout", authController.logout);
router.post("/createThought", authController.createThought);
router.get("/dashboardThoughts", authController.dashboardThoughts);
router.post("/deleteThought", authController.deleteThought);
router.post("/updateThought", authController.updateThought);
router.get("/getThoughts", authController.getThoughts);
router.post("/searchThoughts", authController.searchThoughts);
export default router;
