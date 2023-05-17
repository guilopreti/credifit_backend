import { Router } from "express";
import AppController from "./app.controller";

const router = Router();

router.post("/", AppController.store);
router.get("/users", AppController.index);

export default router;
