import mongoose from "mongoose";

// Shcema needs new keyword to create new Shema

// sender = type objectid ref user, required
// receiver = type objectid , ref user,
// content -> type string, required
// 씨발 이 자체가 그냥 TABLE인겨
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// const messageModel = mongoose.model("message", messageSchema);
const Message = mongoose.model("Message", messageSchema);

//  Model doens't need a new key word
export default Message;
