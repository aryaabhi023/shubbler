import {
  registerUser,
  login,
  logout,
  refreshAccessToken,
  getCurrentUser,
  sendOtp,
} from "../controller/user.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/verify").post(sendOtp);
router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/current-user").get(verifyJWT, getCurrentUser);

export { router };
