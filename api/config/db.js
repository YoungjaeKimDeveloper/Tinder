import mongoose from "mongoose";

const connectDB = async () => {
  const MONGO_URL = process.env.MONGO_URL;
  try {
    const connect = await mongoose.connect(MONGO_URL);
    if (connect) {
      console.log("DATA IS CONNECTED");
    }
  } catch (error) {
    console.log(`ERROR! : ${error.message}`);
    process.exit(1); // exit process with failure
  }
};

export default connectDB;
