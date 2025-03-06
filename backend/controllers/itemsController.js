import { v2 as cloudinary } from "cloudinary";
import connection from "../config/db.js";

// Cloudinary yapılandırması
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const postItem = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Gönderilen verileri göster
    console.log("User ID from token:", req.user); // Token'dan gelen user bilgisi
    console.log("Uploaded File:", req.file); // Multer dosyayı düzgün aldı mı?

    const userId = req.user?.id; // Token'dan gelen kullanıcı ID
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    // Kullanıcının iletişim bilgilerini al
    const [userRows] = await connection.execute(
      "SELECT contact_me FROM users WHERE id = ?",
      [userId]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User Contact:", userRows[0]); // Kullanıcının iletişim bilgisi

    const contactMe = userRows[0].contact_me || "";

    // Cloudinary'ye yükleme
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `user_${userId}`,
    });

    console.log("Cloudinary Upload Result:", result);

    // MySQL'e kaydetme
    const [rows] = await connection.execute(
      "INSERT INTO items (user_id, title, description, image_url) VALUES (?, ?, ?, ?)",
      [userId, title, description, result.secure_url]
    );

    res
      .status(201)
      .json({ message: "Item posted successfully", itemId: rows.insertId });
  } catch (error) {
    console.error("Error posting item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//show all items
export const getAllItems = async (req, res) => {
  try {
    const query = "SELECT * FROM items ORDER BY RAND()";
    const [items] = await connection.execute(query);

    res.status(200).json({ message: "Items retrieved successfully", items });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  res.status(200).json({ message: "Delete item" });
};
