import express from "express";
import { getAllMembers, getLatestEvent, submitContactForm } from "../controllers/client.controller.js";

const router = express.Router();

router.get("/all-members", getAllMembers);
router.post("/submit-form", submitContactForm);
router.get("/latest-event", getLatestEvent);


export default router;
