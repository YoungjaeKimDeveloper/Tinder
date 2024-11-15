import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, receiverId } = req.body;
    // When we call the Schema, we have to use await keyword
    const newMessage = await Message.create({
      sender: req.user.id,
      receiver: receiverId,
      content: content,
    });
    console.log("NEW MESSAGE HAS BEEN CREATED");
    res.status(201).json({
      success: true,
      message: newMessage,
    });
    // TODO: SEND THE MESSAGE IN REAL TIME => SOCKET.IO
  } catch (error) {
    console.log("Error in sendingMessage: ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getConversation = async (req, res) => {
  const { userId } = req.params;
  try {
    const message = await Message.find({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id },
      ],
    }).sort("createdAt");

    res.status(200).json({
      success: true,
      message: message,
    });
  } catch (error) {
    console.log("Error in getConversation : ", error);
    res.status(500).json({
      success: fasle,
      message: "INTERNAL SERVER ERROR   ",
    });
  }
};
