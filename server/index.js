import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const app = express();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("MogoDB is connected");
}) .catch((err)=>{
    console.log(err);
})

app.get("/", (req, res) => {
  res.send(`<h1>Hi this is server</h1>`);
});

const port = 8000;
app.listen(port, () => {
  console.log("The server is running on 8000");
});
