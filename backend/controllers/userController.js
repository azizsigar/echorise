export const registerUser = async (req, res) => {
  res.status(200).json({ message: "Register user" });
};
export const loginUser = async (req, res) => {
  res.status(200).json({ message: "Login user" });
};
export const profileUser = async (req, res) => {
    res.status(200).json({ message: "Profile user" });
}
export const updateUser = async (req, res) => {
    res.status(200).json({ message: "Update user" });
}
export const deleteUser = async (req, res) => {
    res.status(200).json({ message: "Delete user" });
}
export const getUserById = async (req, res) => {
    res.status(200).json({ message: "Get user by ID" });
}
export const getUsersByAdmin = async (req, res) => {
    res.status(200).json({ message: "Get users by admin" });
}
export const deleteUserByAdmin = async (req, res) => {
    res.status(200).json({ message: "Delete user by admin" });
}
