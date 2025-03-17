import express from "express";
import { uploadMiddleware } from "../middleware/uploadMiddleware.js";

import {
  deleteItem,
  getAllItems,
  postItem,
} from "../controllers/itemsController.js";
import verifyToken from "../middleware/authMiddleware.js";
const itemRouter = express.Router();

itemRouter.get("/", getAllItems); //for search button
itemRouter.post("/post", verifyToken, uploadMiddleware, postItem);
itemRouter.delete("/:id", verifyToken, deleteItem);

export default itemRouter;
