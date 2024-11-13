import jwt from "jsonwebtoken";
import UserMmodel from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookie.jwt;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "NOT AUTHORIZED - NO TOKEN PROVIDED",
      });
    }
    // Since we used the secert JWT toekn we need to use the JWT Token to verify.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Not authorized - Invalid token",
      });
    }

    const currentUser = await UserMmodel.findById(decoded.id);

    req.user = currentUser;
    next();
  } catch (error) {
    console.log("Error in auth middleware : ", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Not authorized - Invalid Token Web Token Error",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};
