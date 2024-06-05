import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { app } from "./app.js";

const port = process.env.PORT || 7006;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("Listening to port " + port);
    });
  })
  .catch((err) => {
    console.log("MongoDB didn't Connected");
  });
