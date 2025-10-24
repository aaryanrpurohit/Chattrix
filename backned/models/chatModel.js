// chatModel.js
import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    name: String,
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: String }], // Clerk user IDs
    lastMessage: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
