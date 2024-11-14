import UserMmodel from "../models/User.js";

export const swipeRight = async (res, req) => {};

export const swipeLeft = async (res, req) => {};

export const getMatches = async (res, req) => {
  try {
    // Check Later
    const user = await UserMmodel.findById(req.user.id).populate(
      "matches",
      "name image"
    );
    res.status(200).json({
      success: ture,
      matcehs: user.matches,
    });
  } catch (error) {
    console.log("ERROR in getMatches: ", error.message);
    // Always return the response
    res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

export const getUserProfiles = async (res, req) => {};
