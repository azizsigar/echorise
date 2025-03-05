import bcrypt from "bcrypt";
import connection from "../config/db.js";

export const registerUser = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "Invalid input: Username and password are required" });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into database
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    const [result] = await connection.execute(query, [
      userName,
      hashedPassword,
    ]);

    await connection.end();

    // Respond with success
    res.status(200).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error registering user", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Username already taken" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "Invalid input: Username and password are required" });
  }
  try {
    const query = "SELECT * FROM users WHERE username = ?";
    const [rows] = await connection.execute(query, [userName]);

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful", userId: user.id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  res.status(200).json({ message: "Delete user" });
};
export const getUser = async (req, res) => {
  res.status(200).json({ message: "Get user" });
};
