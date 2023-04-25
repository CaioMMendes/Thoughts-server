import { Router } from "express";
import * as thoughtsController from "../controllers/thoughtsController";

const router = Router();

router.get("/", thoughtsController.thoughtsApi);
export default router;
