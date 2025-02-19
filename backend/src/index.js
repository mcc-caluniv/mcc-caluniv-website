import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.config.js";
import eventRoutes from "./routes/event.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import clientRoutes from "./routes/client.route.js";
import bodyParser from "body-parser";
import path from "path";

const __dirname = path.resolve();

//CONFIGS
dotenv.config();

//INITIALIZATION
const app = express();

//CONSTANTS
const PORT = process.env.PORT || 5000;

//MIDDLEWARES
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

//ROUTES
app.use("/api/event", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/client", clientRoutes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

//LISTENING
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
