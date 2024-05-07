import axios from "axios";

export const getAllPost = async () => {
  try {
    const posts = await axios.get("/api/v1/vichar/get-posts");
    return posts;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const getPost = async (id) => {
  try {
    const post = await axios.get("/api/v1/vichar/get-post/" + id);
    return post;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const createPost = async (post) => {
  try {
    const newPost = await axios.post("/api/v1/vichar/add-post", post);
    return newPost;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const deletePost = async (id) => {
  try {
    await axios.delete(`/api/v1/vichar/delete-post/${id}`);
  } catch (err) {
    console.log(err.message);
    return null;
  }
};
