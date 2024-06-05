import {
  registerUser,
  login,
  logout,
  refreshAccessToken,
  getCurrentUser,
  sendOtp,
  verifyEmail,
  ForgetPassword,
  getUserByUsername,
  updateAvatar,
} from "../controller/user.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/verify").post(sendOtp);
router.route("/verify-email").post(verifyEmail);
router.route("/forget-password").post(ForgetPassword);
router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/get-user").post(getUserByUsername);
router
  .route("/update-avatar")
  .post(verifyJWT, upload.single("avatar"), updateAvatar);

export { router };
