import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    vicharId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vichar",
    },
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model("Comment", CommentSchema);
