import express from "express";

import {
  registerUser,
  loginUser,
  profileUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsersByAdmin,
  deleteUserByAdmin,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", profileUser);
userRouter.put("/update", updateUser);
userRouter.delete("/delete", deleteUser);
userRouter.get("/:id", getUserById);
userRouter.get("/", getUsersByAdmin);
userRouter.delete("/:id", deleteUserByAdmin);


export default userRouter;
