import UserMmodel from "../models/User.js";

export const swipeRight = async (res, req) => {
  try {
    const { likedUserId } = req.params;
    // 현재 사용하고있는 사용자를 의미함
    const currentUser = await UserMmodel.findById(req.user.id);
    // 넘어오는 상대를 의미함 
    const likedUser = await UserMmodel.findById(likedUserId);
    // 상대방을 찾을수없을때를 의미함 
    if (!likedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // 현재 Likes리스트에 들어가있지않을떄
    if (!currentUser.likes.includes(likedUserId)) {
      currentUser.likes.push(likedUserId);
      await currentUser.save();
      // TODO SEND NOTIFICATION IF IT IS A MATCH => SOCKET.IO
      if (likedUser.likes.includes(currentUser.id)) {
        // 동시에 좋아요를 눌러서 matche 가 될떄임
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

// 좋아하지않이기능이기때문에 dislikes array에만 넣어주면됌
export const swipeLeft = async (res, req) => {
  try {
    const { dislikedUserId } = req.params;
    const currentUser = await UserMmodel.findById(req.user.id);
    // Coding is just repetation of simple logic
    if (!currentUser.dislikes.includes(dislikedUserId)) {
      currentUser.dislikes.push(dislikedUserId);
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
// Finding matching partner
export const getUserProfiles = async (res, req) => {
  try {
    // Current User라는건 현재 앱을 사용하고있는 사용자를 의미함
    const currentUser = await UserMmodel.findById(req.user.id);

    // Mongoose Syntax.
    // Ne : not Eaqul
    // nin : not in
    // Other user's Profile Pictures
    const users = await UserMmodel.find({
      $and: [
        // 현재 사용자뺴주고
        { _id: { $ne: currentUser.id } },
        // 좋아하는사람뺴주고
        { _id: { $nin: currentUser.likes } },
        // 안좋아한느사람 빼주고 
        { _id: { $nin: currentUser.dislikes } },
        // 매치된 사람 빼주고
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
