import express from "express";

import {
  deleteUser,
  loginUser,
  registerUser,
  getUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.delete("/delete", deleteUser);

export default userRouter;
