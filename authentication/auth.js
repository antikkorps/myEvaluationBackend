const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// generate a JWT token
const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '48h' });
  return token;
};

// Verify a JWT Token and get the information about the user
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    // If the token is invalid or expired
    return null;
  }
};

//compare password
const comparePassword = (plainPassword, passwordHash) => {
  const compared = bcrypt.compareSync(plainPassword, passwordHash);
  return compared;
};

module.exports = {
  generateToken,
  verifyToken,
  comparePassword,
};
