import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/Icart`);
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.log("Mongodb connection failed ", error);
  }
};

export default connectDB;
