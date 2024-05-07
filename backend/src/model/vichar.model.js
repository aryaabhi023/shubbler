import mongoose from "mongoose";

const vicharSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Vichar = mongoose.model("Vichar", vicharSchema);
