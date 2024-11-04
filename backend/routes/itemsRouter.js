import {
    getAllItems, 
    getItemById,
    postItem,
    updateItem,
    deleteItem,

} from "../controllers/itemsController.js";
import express from "express";
const itemRouter = express.Router();

itemRouter.get("/", getAllItems);
itemRouter.get("/:id", getItemById);
itemRouter.post("/post", postItem);
itemRouter.put("/update/:id", updateItem);
itemRouter.delete("/delete/:id", deleteItem);

export default itemRouter;
