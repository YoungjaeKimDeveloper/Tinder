import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {
  swipeLeft,
  swipeRight,
  getMatches,
  getUserProfiles,
} from "../controllers/matchController.js";
const router = express.Router();

router.post("/swipte-right/:likeUserId", protectRoute, swipeRight);
router.post("/swipte-left/:dislikeUserId", protectRoute, swipeLeft);

router.get("/", protectRoute, getMatches);
router.get("/user-profiles", protectRoute, getUserProfiles);

export default router;
