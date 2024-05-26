import axios from "axios";

const backendUrl = "https://shubbler-api.onrender.com/";

export const addComment = async (comment) => {
  try {
    await axios.post(backendUrl + "/api/v1/comment/add-comment", comment);
  } catch (error) {
    console.log(error.message);
  }
};

export const getComment = async (id) => {
  try {
    const comments = await axios.post(
      backendUrl + "/api/v1/comment/get-comment",
      id
    );
    return comments;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const removeComment = async (id) => {
  try {
    await axios.post(backendUrl + "/api/v1/comment/remove-comment", {
      id,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteComment = async (vicharId) => {
  try {
    await axios.post(backendUrl + "/api/v1/comment/delete-comment", {
      vicharId,
    });
  } catch (err) {
    console.log(err.message);
  }
};
