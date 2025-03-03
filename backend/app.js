import cors from "cors";
import express from "express";
import itemsRouter from "./routes/itemsRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/items", itemsRouter);
app.use("/api/auth", userRouter);

export default app;
