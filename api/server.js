import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// Routes
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import matchesRoutes from "./routes/matchesRoutes.js";
import messageRoutes from "./routes/messagesRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

app.use(express.json());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", matchesRoutes);
app.use("/api/matches", messageRoutes);
app.use("/api/messages", usersRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`SERVER IS RUNNING in ${PORT}`);
});
