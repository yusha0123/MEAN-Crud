import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected!");
  } catch (error) {
    console.log("Database Connection Failed: ", error);
  }
};

export default connectDb;
