import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  genderPreference: {
    type: String,
    required: true,
    enum: ["male", "female", "both"],
  },
  bio: { type: String, default: "" },
  image: { type: String, default: "" },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Question
userShema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// Function 을 사용하지않으면 this binding 을 할수없게됨
// ADD THE. .method keywords to create own schema methods
userShema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserMmodel = mongoose.model("User", userShema);

export default UserMmodel;
