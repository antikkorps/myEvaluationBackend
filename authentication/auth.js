const jwt = require('jsonwebtoken');

// Fonction pour générer un token JWT
const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// Fonction pour vérifier un token JWT et récupérer les informations de l'utilisateur
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    // En cas d'erreur, par exemple si le token est invalide ou a expiré
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
