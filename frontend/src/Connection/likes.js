import axios from "axios";

const backendUrl = "https://shubbler-api.onrender.com";
export const addLike = async (vicharId) => {
  try {
    await axios.post(backendUrl + "/api/v1/like", vicharId);
  } catch (err) {
    console.log(err.message);
  }
};
export const removeLike = async (vicharId) => {
  try {
    await axios.post(backendUrl + "/api/v1/like/remove-like", vicharId);
  } catch (err) {
    console.log(err.message);
  }
};

export const totalLikes = async (vicharId) => {
  try {
    console.log(vicharId);
    const obj = await axios.post(
      backendUrl + "/api/v1/like/total-likes",
      vicharId
    );
    return obj.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteLike = async (vicharId) => {
  try {
    await axios.post(backendUrl + "/api/v1/like/delete-like", {
      vicharId,
    });
  } catch (err) {
    console.log(err.message);
  }
};
