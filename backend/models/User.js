import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: String,
  username: String,
  thumbnail: String,
});

export default mongoose.model("User", userSchema);
