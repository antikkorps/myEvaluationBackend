const { generateToken } = require('../authentication/auth');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = (app) => {
  const router = require('express').Router();

  // Login route to get the JWT Token
  router.post('/', (req, res) => {
    const { username, password } = req.body;
    //check empty fields
    if (!username || !password) {
      res.status(400).json({ message: 'Veuillez remplir tous les champs' });
    }

    // Check if the user exists in the database
    const user = prisma.user.findUnique({ where: { username } });
    if (!user) {
      res
        .status(400)
        .json({ message: 'Utilisateur ou Mot de passe incorrect' });
    }

    // Check if the password is correct
    const hashedPassword = bcrypt.hash(password, 10);
    const validPassword = bcrypt.compare(password, hashedPassword.toString());
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Utilisateur ou Mot de passe incorrect' });
    }
    //Generate a JWT Token
    const token = generateToken({ username });
    //send the token in the response
    res.json({ token, username });
  });

  // Utilisez le routeur dans votre application Express
  app.use('/api/login', router);
};
