import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router as userRouter } from "./routes/user.router.js";
import { router as vicharRouter } from "./routes/vichar.router.js";
import { router as likeRouter } from "./routes/like.router.js";
import { router as commentRouter } from "./routes/comment.router.js";

const app = express();
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

// app.use(
//   cors({
//     origin: [
//       "https://shubbler-api.onrender.com",
//       "https://shubbler.vercel.app",
//       "http://localhost:5173",
//       "http://localhost:7004",
//     ],
//     credentials: true,
//   })
// );

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/vichar", vicharRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/comment", commentRouter);

export { app };
