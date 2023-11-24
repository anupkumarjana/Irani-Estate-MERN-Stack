import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import Jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body; // in this object we are getting the data
  const hashedPassword = bcrypt.hashSync(password, 10); //here we are encrypting the password
  const newUser = new User({ username, email, password: hashedPassword }); //we are storing the data in database
  try {
    await newUser.save();
    res.status(201).json("User created Successfully!");
  } catch (err) {
    next(err); //this is for--> if the username is not unique then its gonna throw error
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //we're chcking if the user is already registerd or not
    const validUser = await User.findOne({ email });
    //if not a register user then-->
    if (!validUser) {
      return next(errorHandler(404, "User not found!")); //this error handler is coming from utils/error.js
    }
    //checking the password is valid or not
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "Wrong Credentials!"));
    }
    const token = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: passw, ...restinfo } = validUser._doc;  //here we're removing the password from the valid user for security purpuses
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(restinfo);
  } catch (err) {
    next(err);
  }
};
