import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router as userRouter } from "./routes/user.router.js";
import { router as vicharRouter } from "./routes/vichar.router.js";
import { router as likeRouter } from "./routes/like.router.js";
import { router as commentRouter } from "./routes/comment.router.js";

const app = express();

const corsOptions = {
  origin: "https://shubbler.vercel.app",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      'Now you can browse to <a href="https://shubbler.vercel.app" target="_blank">https://shubbler.vercel.app</a>'
    );
});

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/vichar", vicharRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/comment", commentRouter);

export { app };
