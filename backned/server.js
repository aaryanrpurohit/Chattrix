import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import friendRoutes from "./routes/friendRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { clerkAuth } from "./middleware/clerkAuth.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/friends", clerkAuth, friendRoutes);
app.use("/api/chats", clerkAuth, chatRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
connectDB();

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});
