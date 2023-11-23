import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";

dotenv.config();

const app = express();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MogoDB is connected");
  })
  .catch((err) => {
    console.log(err);
  });

// app.get("/test", (req, res) => {
//   res.send(`<h1>Hi this is server</h1>`);
// });

app.use("/server/user", userRouter);

const port = 8000;
app.listen(port, () => {
  console.log("The server is running on 8000");
});




