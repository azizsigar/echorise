// authMiddleware.js
export const isAdmin = (req, res, next) => {
  // Assuming the user role is stored in req.user after authentication
  if (req.user && req.user.role === "admin") {
    return next(); // User is admin, proceed to the next middleware/route handler
  }
  return res.status(403).json({ message: "Access denied: Admins only" });
};
