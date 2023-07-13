// this file handles JWT-related functions

const jwt = require("jsonwebtoken");
function generateToken(id, userEmail, typeOfUser) {
  console.log("Generating token...");
  console.log("User ID:", id);
  console.log("User Email:", userEmail);
  console.log("User Type:", typeOfUser);
  const payload = {
    id,
    email: userEmail,
    typeOfUser
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1d"
  });
  console.log("Token generated:", token);
  return token;
}
function verifyToken(token) {
  console.log("Verifying token...");
  console.log("Received token:", token);
  console.log("JWT Secret:", process.env.JWT_SECRET);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"]
    });
    console.log(decoded);
    return decoded;
  } catch (error) {
    console.log(error);
    throw new Error("Invalid token");
  }
}
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader, 1);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token, 1);
    try {
      const decodedToken = verifyToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      // Invalid or expired token
      res.status(401).json({
        error: "Unauthorized"
      });
    }
  } else {
    // No token provided
    res.status(401).json({
      error: "Unauthorized"
    });
  }
}
module.exports = {
  generateToken,
  verifyToken,
  authenticateToken
};