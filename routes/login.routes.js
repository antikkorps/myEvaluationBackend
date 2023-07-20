const { generateToken } = require('../authentication/auth');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = (app) => {
  const users = require('../controllers/user.controller.js');
  const router = require('express').Router();

  // Login route to get the JWT Token
  router.post('/', users.login);

  app.use('/api/v1/users/login', router);
};
