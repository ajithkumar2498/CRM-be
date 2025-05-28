import jwt from "jsonwebtoken";
import User from "../Models/userModel.js"

const protectRoute = async (req, res, next) => {
  try {
    const authToken = req?.headers?.authorization;

      if (!authToken || !authToken.startsWith("Bearer ")) {
      return res.status(401).json({ status: false, message: "No token found" });
    }
     

    const token = authToken.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ status: false, message: "User not found" });
    }

    req.user = {
      email: user.email,
      userId: user._id,
    };

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ status: false, message: "Not authorized. Try login again." });
  }
};

export { protectRoute };
