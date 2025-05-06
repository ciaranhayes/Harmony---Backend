import mongoose from "mongoose";

export default async function connectDB() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database has been accessed!");
  } catch (error: any) {
    console.log(`You ran into an oopsi! ${error.message}`);
  }
}
