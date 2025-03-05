import express from "express";
import {
  deleteUser,
  getUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import verifyToken from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", verifyToken, getUser);
userRouter.delete("/delete/", verifyToken, deleteUser);

export default userRouter;
