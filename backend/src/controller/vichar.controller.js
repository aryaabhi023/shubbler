import { Vichar } from "../model/vichar.model.js";

const getAllPost = async (req, res) => {
  try {
    const vichars = await Vichar.find().sort({ createdAt: -1 });
    res.status(200).json(vichars);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

const getPost = async (req, res) => {
  try {
    const vichar = await Vichar.findById(req.params.id);
    res.status(200).json(vichar);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

const addPost = async (req, res) => {
  try {
    const { tag, content } = req.body;
    const { username } = req.user;
    const vichar = new Vichar({
      tag: tag,
      username: username,
      content: content,
    });
    await vichar.save();
    res.status(201).json(vichar);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await Vichar.findByIdAndDelete(id);
    res.status(200).json("Vichar deleted successfully");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export { getAllPost, getPost, addPost, deletePost };
