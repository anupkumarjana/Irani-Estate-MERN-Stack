import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/05/26/72/46/240_F_526724677_JpExJ4Kd4nsWjXMFHyPPXhKX7G5DLvuF.jpg",
    },
  },
  { timestamp: true } //to record the login time we're storing this info
);

const User = mongoose.model("User", userSchema);

export default User;
