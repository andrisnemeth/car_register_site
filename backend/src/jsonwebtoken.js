// this file handles JWT-related functions

const jwt = require("jsonwebtoken");

function generateToken(userId) {
  const payload = { userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.log(error);
    throw new Error("Invalid token");
  }
}

module.exports = { generateToken, verifyToken };
