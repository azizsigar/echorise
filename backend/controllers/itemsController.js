export const getAllItems = async (req, res) => {
    res.status(200).json({ message: "Get all items" });
}
export const getItemById = async (req, res) => {
    res.status(200).json({ message: "Get item by ID" });
}
export const postItem = async (req, res) => {
    res.status(200).json({ message: "Post item" });
}
export const updateItem = async (req, res) => {
    res.status(200).json({ message: "Update item" });
}
export const deleteItem = async (req, res) => {
    res.status(200).json({ message: "Delete item" });
}
