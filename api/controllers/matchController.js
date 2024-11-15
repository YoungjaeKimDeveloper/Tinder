import UserMmodel from "../models/User.js";

export const swipeRight = async (res, req) => {
  try {
    const { likedUserId } = req.params;
    const currentUser = await UserMmodel.findById(req.user.id);
    const likedUser = await UserMmodel.findById(likedUserId);
    if (!likedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (!currentUser.likes.includes(likedUserId)) {
      currentUser.likes.push(likedUserId);
      await currentUser.save();
      // TODO SEND NOTIFICATION IF IT IS A MATCH => SOCKET.IO
      if (likedUser.likes.includes(currentUser.id)) {
        currentUser.matches.push(likedUserId);

        await Promise.all([await currentUser.save(), await likedUser.save()]);
      }
    }
    res.status(200).json({
      success: true,
      user: currentUser,
    });
  } catch (error) {
    console.log("ERROR IN SWIPE RIGHT", error);
    res.status(500).json({
      success: false,
      message: "INTERNAL ERROR",
    });
  }
};

export const swipeLeft = async (res, req) => {
  try {
    const { dislikeUserId } = req.params;
    const currentUser = await UserMmodel.findById(req.user.id);
    // Coding is just repetation of simple logic
    if (!currentUser.dislikes.includes(dislikeUserId)) {
      currentUser.dislikes.push(dislikeUserId);
      await currentUser.save();
      // if the other user already liked us, it's a match, so Let's update both users
    }

    res.status(200).json({
      success: true,
      user: currentUser,
    });
  } catch (error) {
    console.log("ERROR IN SWIPELEFT ", error.message);
    res.status(500).json({
      success: false,
      message: "INTERNAL USER SCHEMA ERROR",
    });
  }
};

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

export const getUserProfiles = async (res, req) => {
  try {
    const currentUser = await UserMmodel.findById(req.user.id);

    // Mongoose Syntax.
    // Ne : not Eaqul
    // nin : not in
    // Other user's Profile Pictures
    const users = await UserMmodel.find({
      $and: [
        { _id: { $ne: currentUser.id } },
        { _id: { $nin: currentUser.likes } },
        { _id: { $nin: currentUser.dislikes } },
        { _id: { $nin: currentUser.matches } },
        {
          gender:
            currentUser.genderPreference === "both"
              ? { $in: ["male,female"] }
              : currentUser.genderPreference,
        },
        // I cannot understand this code line.
        { genderPreference: { $in: [currentUser.gender, "both"] } },
      ],
    });
    res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    console.log("Error in getUsersProfiles ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
