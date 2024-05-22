import mongoose from "mongoose";
export const dbConnect = async () => {
  const MONGO_URL =
    "mongodb://localhost:27017/admin-service";
  try {
    const conn = await mongoose.connect(MONGO_URL);
    console.log(`🍃 Database Established connection with MongoDB`);
  } catch (error: any) {
    console.error(`❌ Database Connection failed`);
    console.error(error.message);
    process.exit(1);
  }
};
