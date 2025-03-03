export const getAllItems = async (req, res) => {
  res.status(200).json({ message: "Get all items" });
};
export const postItem = async (req, res) => {
  res.status(200).json({ message: "Post item" });
};
export const deleteItem = async (req, res) => {
  res.status(200).json({ message: "Delete item" });
};
