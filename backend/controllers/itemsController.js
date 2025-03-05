import connection from "../config/db.js";
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

export const postItem = async (req, res) => {
  res.status(200).json({ message: "Post item" });
};
export const deleteItem = async (req, res) => {
  res.status(200).json({ message: "Delete item" });
};
