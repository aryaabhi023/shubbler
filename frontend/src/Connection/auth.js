import axios from "axios";
axios.defaults.withCredentials = true;

const backendUrl = "https://shubbler-api.onrender.com";

export const login = async ({ username, password }) => {
  try {
    const res = await axios.post("/api/v1/user/login", {
      username,
      password,
    });
    return res;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const registerUser = async ({ fullName, email, username, password }) => {
  try {
    let res = await axios.post("/api/v1/user/register", {
      fullName,
      email,
      username,
      password,
    });
    res = login({ username, password });
    return res;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const logout = async () => {
  try {
    await axios.post("/api/v1/user/logout");
  } catch (error) {
    console.log(error.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await axios.get("/api/v1/user/current-user");
    return res;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const refreshAccessToken = async () => {
  try {
    const res = await axios.post("/api/v1/user/refresh-token");
    return res;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
