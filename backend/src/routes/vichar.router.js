import { Router } from "express";
import {
  getAllPost,
  getPost,
  addPost,
  deletePost,
} from "../controller/vichar.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/get-posts").get(getAllPost);
router.route("/add-post").post(verifyJWT, addPost);
router.route("/get-post/:id").get(verifyJWT, getPost);
router.route("/delete-post/:id").delete(verifyJWT, deletePost);
export { router };
