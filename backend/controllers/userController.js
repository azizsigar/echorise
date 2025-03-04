import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export const registerUser = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "Invalid input: Username and password are required" });
  }

  try {
    // Test MySQL connection
    const connection = await mysql.createConnection(dbConfig);

    // Insert user into database
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    const [result] = await connection.execute(query, [userName, password]);

    // Close connection after query execution
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
  res.status(200).json({ message: "Login user" });
};
export const deleteUser = async (req, res) => {
  res.status(200).json({ message: "Delete user" });
};
export const getUser = async (req, res) => {
  res.status(200).json({ message: "Get user" });
};
