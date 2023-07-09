const { generateToken } = require('../authentication/auth');

module.exports = (app) => {
  const evaluations = require('../controllers/evaluation.controller.js');
  const router = require('express').Router();

  // Route de connexion pour obtenir le token JWT
  router.post('/', (req, res) => {
    const { username, password } = req.body;

    // Vérifiez les informations d'identification de l'utilisateur, par exemple, en les comparant avec la base de données
    if (username === 'example' && password === 'password') {
      // Générez un token JWT avec les informations de l'utilisateur
      const token = generateToken({ username });

      // Renvoyez le token JWT dans la réponse
      res.json({ token });
    } else {
      // Si les informations d'identification sont incorrectes, renvoyez une réponse d'erreur
      res
        .status(401)
        .json({ message: "Informations d'identification invalides" });
    }
  });

  // Utilisez le routeur dans votre application Express
  app.use('/api/login', router);
};
