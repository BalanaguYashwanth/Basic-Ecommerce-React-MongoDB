import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const conn = mongoose.connection;
    conn.on("open", () => {
      console.log("connected successfully".inverse);
    });
  } catch (err) {
    console.log("error", err.message.red.inverse);
  }
};
export default connectDB;
