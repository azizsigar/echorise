import bcrypt from "bcrypt";
import dotenv from "dotenv";
import connection from "../config/db.js";
import createToken from "../middleware/createToken.js";
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

    try {
      const token = createToken(user);
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
  const { id } = req.user; // Middleware'den gelen kullanıcı ID'si

  try {
    // Kullanıcı bilgilerini çek
    const userQuery = "SELECT id, username, contact_me FROM users WHERE id = ?";
    const [userRows] = await connection.execute(userQuery, [id]);

    if (userRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Kullanıcıya ait itemleri çek
    const itemsQuery =
      "SELECT id, title, description, image_url, created_at FROM items WHERE user_id = ?";
    const [itemsRows] = await connection.execute(itemsQuery, [id]);

    res.status(200).json({
      user: userRows[0], // Kullanıcı bilgisi
      items: itemsRows, // Kullanıcıya ait itemler
    });
  } catch (error) {
    console.error("Error fetching user and items:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete User (Future Implementation)
export const deleteUser = async (req, res) => {
  const { id } = req.user; // Extract user ID from token middleware

  try {
    const query = "DELETE FROM users WHERE id = ?";
    const [result] = await connection.execute(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
