import {
  getAllItems,
  getItemById,
  postItem,
  updateItem,
  deleteItem,
} from "../controllers/itemsController.js";
import express from "express";
import { isAdmin } from "../middleware/authMiddleware.js";
const itemRouter = express.Router();

itemRouter.get("/", getAllItems);
itemRouter.get("/:id", getItemById);
itemRouter.post("/post", isAdmin, postItem);
itemRouter.put("/update/:id", isAdmin, updateItem);
itemRouter.delete("/delete/:id", isAdmin, deleteItem);

export default itemRouter;
