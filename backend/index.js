import express from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors"; // CORS'u içe aktar
import authRoutes from "./routes/auth.js";
import "./passport-setup.js";

dotenv.config();

const app = express();

// CORS Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // İstemcinin bulunduğu URL
    credentials: true, // Cookie'lerin taşınabilmesi için
  })
);

// Middleware
app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 saat
  })
);
app.use(passport.initialize());
app.use(passport.session());

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
