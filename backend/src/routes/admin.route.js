import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  addAward,
  addMember,
  addPartner,
  createEvent,
  deleteAward,
  deleteEvent,
  deleteMember,
  deletePartner,
  getAllAdminRequests,
  getAllMessages,
  getAwards,
  getPartners,
  updateEventStatus,
  updateVerificationStatus,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/requests", protectRoute, getAllAdminRequests);
router.put("/update-request/:userId", protectRoute, updateVerificationStatus);

router.post("/add-member", protectRoute, addMember);
router.delete("/delete-member/:id", protectRoute, deleteMember);

router.post("/create-event", protectRoute, createEvent);
router.put("/update-status/:eventId", protectRoute, updateEventStatus);
router.delete("/delete-event/:eventId", protectRoute, deleteEvent);

router.get("/all-messages", protectRoute, getAllMessages);

router.post("/add-award", protectRoute, addAward); // Route to add a new award
router.get("/all-awards", getAwards); // Route to fetch all awards
router.delete("/delete-award/:id", protectRoute, deleteAward); // Delete an award by ID

router.post("/add-partner", protectRoute, addPartner); // Route to add a partner
router.get("/all-partner", getPartners); // Route to get all partners
router.delete("/delete-partner/:id", protectRoute, deletePartner); // Route to delete a partner by ID

export default router;
