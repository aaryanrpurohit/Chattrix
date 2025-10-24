// messageModel.js
import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    sender: { type: String, required: true }, // Clerk ID
    content: { type: String, required: true },
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
