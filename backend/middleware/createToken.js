import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const createToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export default createToken;
