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
    if (!validUser) return next(errorHandler(404, "User not found!")); //this error handler is coming from utils/error.js

    //if the user is valid/registered then checking the password is valid or not
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials!"));

    const token = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: passw, ...restinfo } = validUser._doc; //here we're removing the password from the valid user for security purpuses
    res
      .cookie("access_token", token, { httpOnly: true }) //access_token is the name of cokkie and we passed the cokkie and to make it safe
      .status(200) //we have done httpOnly true
      .json(restinfo);
  } catch (err) {
    next(err); //if there's any error its gonna send by next to our middleware
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).maxTimeMS(20000);
    if (user) {
      const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = Jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
