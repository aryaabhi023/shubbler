import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  vicharId: { type: mongoose.Schema.Types.ObjectId, ref: "Vichar" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Like = mongoose.model("Like", likeSchema);
