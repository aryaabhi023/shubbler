import mongoose, { mongo } from "mongoose";
import { Comment } from "../model/comment.model.js";

export const addComment = async (req, res) => {
  try {
    const { postContent, id } = req.body;
    const { username } = req.user;
    const comment = new Comment({
      content: postContent,
      vicharId: new mongoose.Types.ObjectId(id),
      username,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal server Error");
  }
};

export const getComment = async (req, res) => {
  try {
    const { id } = req.body;
    const comments = await Comment.find({
      vicharId: new mongoose.Types.ObjectId(id),
    }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const removeComment = async (req, res) => {
  try {
    const { id } = req.body;
    const mongID = new mongoose.Types.ObjectId(id);
    await Comment.findByIdAndDelete(mongID);
    res.status(200).json("Remove the comment successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { vicharId } = req.body;
    await Comment.deleteMany({
      vicharId: new mongoose.Types.ObjectId(vicharId),
    });
    res.status(200).json("Comments Deleted Successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
