require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const { PrismaClient } = require('@prisma/client');
const { verifyToken } = require('./authentication/auth');
const loginRoute = require('./routes/login.routes');
const prisma = new PrismaClient();
const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my application.' });
});

// Middleware to verify the JWT Token and add the user information to the request object
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No Token found' });
  }

  const decoded = verifyToken(token);
  console.log(decoded);

  if (!decoded) {
    return res.status(401).json({ message: 'invalid or expired Token' });
  }

  // Add the user information to the request object
  req.user = decoded;

  next();
};

// Use Example for the authMiddleware
app.get('/api/protected', authMiddleware, (req, res) => {
  // Use req.user to get the information about the user
  res.json({
    message: 'Route protected, user is authenticated',
    user: req.user,
  });
});

// Route to connect the user and get the JWT Token

require('./routes/login.routes')(app);
require('./routes/client.routes')(app);
require('./routes/contrat.routes')(app);
require('./routes/evaluation.routes')(app);
require('./routes/methode.routes')(app);
require('./routes/role.routes')(app);
require('./routes/tag.routes')(app);
require('./routes/user.routes')(app);

//set port, listen for requests
const PORT = process.env.PORT || 8080;
require('./routes/evaluation.routes')(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
