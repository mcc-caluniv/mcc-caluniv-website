import express from "express";
import { getEvents } from "../controllers/event.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/all-events", getEvents);

export default router;
