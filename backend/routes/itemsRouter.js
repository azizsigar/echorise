import express from "express";
import {
  deleteItem,
  getAllItems,
  postItem,
} from "../controllers/itemsController.js";
const itemRouter = express.Router();

itemRouter.get("/", getAllItems);
itemRouter.post("/post", postItem);
itemRouter.delete("/delete/:id", deleteItem);

export default itemRouter;
