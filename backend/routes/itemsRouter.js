import express from "express";
import {
  deleteItem,
  getAllItems,
  postItem,
} from "../controllers/itemsController.js";
import verifyToken from "../middleware/authMiddleware.js";
const itemRouter = express.Router();

itemRouter.get("/", getAllItems); //for search button
itemRouter.post("/post", verifyToken, postItem);
itemRouter.delete("/delete/:id", verifyToken, deleteItem);

export default itemRouter;
