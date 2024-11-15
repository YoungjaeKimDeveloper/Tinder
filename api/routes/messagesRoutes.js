import express from "express";
import {
  sendMessage,
  getConversation,
} from "../controllers/messageController.js";

import { protectRoute } from "../middleware/auth.js";

const router = express.Router();
// Set the middleware
router.use(protectRoute);

router.post("/send", sendMessage);
router.get("/conversation/:userI", getConversation);

export default router;
