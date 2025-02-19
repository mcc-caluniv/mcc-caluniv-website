import express from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protectRoute, logout);
router.get("/check", protectRoute, checkAuth);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

export default router;
