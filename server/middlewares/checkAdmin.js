import jwt from "jsonwebtoken";

export const checkAdmin = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      error: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);

    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({
        error: "You are not an admin",
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Token is invalid",
    });
  }
};
