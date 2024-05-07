import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  liked,
  totalLikes,
  removeLike,
  deleteLike,
} from "../controller/like.controller.js";

const router = Router();
router.route("/").post(verifyJWT, liked);
router.route("/remove-like").post(verifyJWT, removeLike);
router.route("/delete-like").post(verifyJWT, deleteLike);
router.route("/total-likes").post(verifyJWT, totalLikes);

export { router };
