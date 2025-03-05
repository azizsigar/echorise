import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import connection from "../config/db.js";

dotenv.config();

// ✅ Register User
export const registerUser = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // ✅ Check if username already exists
    const checkUserQuery = "SELECT * FROM users WHERE username = ?";
    const [existingUser] = await connection.execute(checkUserQuery, [userName]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // ✅ Insert user into database
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    const [result] = await connection.execute(query, [
      userName,
      hashedPassword,
    ]);

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Login User
export const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const query = "SELECT * FROM users WHERE username = ?";
    const [rows] = await connection.execute(query, [userName]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // ✅ Generate JWT token (Valid for 1 hour)
    try {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Login successful",
        userId: user.id,
        token,
      });
    } catch (tokenError) {
      res
        .status(500)
        .json({ message: "Error generating token", error: tokenError.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get User Details
export const getUser = async (req, res) => {
  const { id } = req.user; // Extract user ID from token middleware

  try {
    const query = "SELECT id, username FROM users WHERE id = ?";
    const [rows] = await connection.execute(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete User (Future Implementation)
export const deleteUser = async (req, res) => {
  res
    .status(200)
    .json({ message: "Delete user functionality to be implemented" });
};
