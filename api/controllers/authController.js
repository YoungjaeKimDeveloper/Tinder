import UserMmodel from "../models/User.js";
import jwt from "jsonwebtoken";
// SIGN UP LOGIC
const signToken = (id) => {
  // JWT TOKEN CREATE
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const signup = async (req, res) => {
  // USER INPUT DATA
  const { name, email, password, age, gender, genderPreference } = req.body;

  try {
    //   ALWAYS EXCEPTIONAL CASE FIRST
    if (!name || !email || !password || !age || !gender || !genderPreference) {
      return res
        .status(400)
        .send({ success: false, message: "Please Fill up the all forms" });
    }
    if (age < 18) {
      return res
        .status(400)
        .send({ success: false, message: "ONLY OVER 18 CAN JOIN THE SERVICE" });
    }
    if (password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "PASSWORD SHOULD BE AT LEAST 6 LETTERS",
      });
    }
    // Create User
    const newUser = await UserMmodel.create({
      name,
      email,
      password,
      age,
      gender,
      genderPreference,
    });
    // Check the Token
    const token = signToken(newUser._id);

    // WHAT IS THE COOIKE?
    res.cookie("jwt", token, {
      maxAge: "7 * 24 * 60 * 60 * 1000", // 7days in milliseconds
      httpOnly: true, // prevents XSS Attack
      same: "strict", // prevents CSRF attacks
      secure: process.env.NODE_ENV == "production",
    });
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ success: false, message: "SERVER ERROR" });
  }
};

// LOG IN CONTROLLER
export const login = async (req, res) => {
  // USERI INPUT DATA
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      console.log("USER INPUT INCOMPLETED DATA");
      res
        .status(400)
        .message({ success: false, messsage: "WRITE email and password" });
    }
    // Q. What is the select
    const user = await UserMmodel.findOne({ email }).select("+password");
    // FAILED LOGIN
    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(400)
        .send({ success: false, message: "Cannot find the user" });
    }
    // Token identification
    const token = signToken(user._id);

    res.cookie("jwt", token, {
      maxAge: "7 * 24 * 60 * 60 * 1000", // 7days in milliseconds
      httpOnly: true, // prevents XSS Attack
      same: "strict", // prevents CSRF attacks
      secure: process.env.NODE_ENV == "production",
    });
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.log("Error in logIn controller", error.message);
    res.status(500).json({ success: false, message: "SERVER ERROR" });
  }
};
// LOUGOUT CONTROLLER
export const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
