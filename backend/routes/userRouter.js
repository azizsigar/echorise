import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import {
  deleteUser,
  loginUser,
  registerUser,
  getUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", verifyToken, getUser);
userRouter.delete("/delete", verifyToken, deleteUser);

export default userRouter;
