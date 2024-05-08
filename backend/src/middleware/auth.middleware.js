import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const verifyJWT = async function (req, res, next) {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authentication")?.replace("Bearer ", "");
    if (!token || token === "undefined") {
      return res.status(401).json("Unauthorized request");
    }
    console.log(token, "Hey");
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refeshToken"
    );
    if (!user) {
      return res.status(401).json("Unauthorized request");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error?.message || "Invalid Access TOken");
  }
};
