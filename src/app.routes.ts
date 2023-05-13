import { Router } from "express";
import AppController from "./app.controller";

const router = Router();

router.post("/", AppController.store);

export default router;
