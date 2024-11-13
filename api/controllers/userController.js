import cloudinary from "../config/cloudnary.js";
import UserMmodel from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const { image, ...othersData } = req.body;

    let updatedData = othersData;
    // CHECK IF THE USER UPLOAD THE IMAGE
    // TODO EXPLAIN THIS ONCE AGAIN IN THE UI PART
    if (image) {
      // base64 format
      if (image.startsWith("data:image")) {
        try {
          const uploadResponse = await cloudinary.uploader.upload(image);
          updatedData.image = uploadResponse.secure_url;
        } catch (error) {
          console.error("Error uploading image: ", error.message);
          return res.status(400).json({
            success: false,
            message: "Error uploading image.Profile update aborted.",
          });
        }
      }
    }

    const updatedUser = await UserMmodel.findByIdAndUpdate(
      req.user.id,
      updatedData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log("ERROR APPEAR : ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
