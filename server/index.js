import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.router.js"

dotenv.config();

const app = express();

app.use(express.json());  //this is gonna allow the json data to the server


mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MogoDB is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/test", (req, res) => {
  res.send(`<h1>Hi this is server</h1>`);
});


app.use("/server/user", userRouter);
app.use("/server/auth", authRouter)


//middleware-- for error handling
app.use((err, req, res, next)=>{    //next is for going to the next middleware
    const statusCode= err.statusCode || 500  //here we're saying if there is not any statuscode from the err then send 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({      //its gonna throw details about the error
      success: false,                          //if its successfull or not
      statusCode,                               //whats the error status code
      message,                                  //whats the error message we're getting
    });
})
//--------------------------------

const port = 8000;
app.listen(port, () => {
  console.log("The server is running on 8000");
});




