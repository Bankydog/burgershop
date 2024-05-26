import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Token has invalid format",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Token is invalid",
    });
  }
};
