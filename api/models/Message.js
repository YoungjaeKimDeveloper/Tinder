import mongoose from "mongoose";

// Shcema needs new keyword to create new Shema

// sender = type objectid ref user, required
// receiver = type objectid , ref user,
// content -> type string, required

// Model = SQL TABLE
// ref = Refer the foreign key from other table
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
