import express from "express";
import connectDB from "./config/db.js";
import itemsRouter from "./routes/itemsRouter.js";
import cors from "cors";



connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/items", itemsRouter);

export default app;
