import express from "express";
import { signup, login, logout } from "../controllers/authController.js";
import { protectRoute } from "../middleware/auth.js";
const router = express.Router();
// Controller
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Set the middleware
// If the user reach the request it means, the request passes the middleware
router.get("/me", protectRoute, (req, res) => {
  res.status(200).send({
    success: true,
    user: req.user,
  });
});

export default router;
