import { Like } from "../model/like.model.js";
import mongoose from "mongoose";


export const liked = async (req, res) => {
  try {
    const vicharId = req.body.id;
    const { _id } = req.user;
    const like = new Like({
      vicharId: vicharId,
      userId: _id,
    });
    await like.save();
    res.status(200).json("Liked successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const removeLike = async (req, res) => {
  try {
    const vicharId = req.body.id;
    const { _id } = req.user;
    const like = await Like.findOne({
      vicharId: new mongoose.Types.ObjectId(vicharId),
      userId: _id,
    });
    await Like.findByIdAndDelete(like._id);
    res.status(200).json("UnLiked Successfully...");
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

//delete all likes when that particular post is deleted
export const deleteLike = async (req, res) => {
  try {
    const vicharId = req.body.vicharId;
    await Like.deleteMany({ vicharId: new mongoose.Types.ObjectId(vicharId) });
    res.status(200).json({ message: "All likes deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const totalLikes = async (req, res) => {
  try {
    const vicharId = req.body.id;
    const fetchArr = await Like.find({
      vicharId: new mongoose.Types.ObjectId(vicharId),
    });

    let count = 0;
    if (Array.isArray(fetchArr) && fetchArr.length > 0) {
      count = fetchArr.length;
    }

    res.status(200).json({
      count: count,
      arr: fetchArr,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
