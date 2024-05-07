import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  addComment,
  getComment,
  removeComment,
  deleteComment,
} from "../controller/comment.controller.js";

const router = Router();

router.route("/add-comment").post(verifyJWT, addComment);
router.route("/get-comment").post(verifyJWT, getComment);
router.route("/remove-comment").post(verifyJWT, removeComment);
router.route("/delete-comment").post(verifyJWT, deleteComment);

export { router };
