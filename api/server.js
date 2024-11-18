import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import matchesRoutes from "./routes/matchesRoutes.js";
import messageRoutes from "./routes/messagesRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/matches", matchesRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`SERVER IS RUNNING in ${PORT}`);
});
