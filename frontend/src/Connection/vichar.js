import axios from "axios";

const backendUrl = "https://shubbler-api.onrender.com";

export const getAllPost = async () => {
  try {
    const posts = await axios.get(backendUrl + "/api/v1/vichar/get-posts");
    console.log("hey", posts);
    return posts;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const getPost = async (id) => {
  try {
    const post = await axios.get(backendUrl + "/api/v1/vichar/get-post/" + id);
    return post;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const createPost = async (post) => {
  try {
    const newPost = await axios.post(
      backendUrl + "/api/v1/vichar/add-post",
      post
    );
    return newPost;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const deletePost = async (id) => {
  try {
    await axios.delete(backendUrl + `/api/v1/vichar/delete-post/${id}`);
  } catch (err) {
    console.log(err.message);
    return null;
  }
};
