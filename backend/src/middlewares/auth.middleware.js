import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const admin = await Admin.findById(decoded.adminId).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin Not Found" });
    }

    req.admin = admin;

    next();
  } catch (error) {
    console.log("Error in protectedRoute middleware: ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
