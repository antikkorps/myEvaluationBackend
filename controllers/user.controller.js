const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const UserController = {
  // Create a new user
  async create(req, res) {
    const { name, firstName, username, email, password, role_id, fonction } =
      req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          name,
          firstName,
          username,
          email,
          password: hashedPassword,
          role_id,
          fonction,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'An error occured while creating the user.',
      });
    }
  },

  // Find all users
  async findAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const offset = (page - 1) * limit;

      const users = await prisma.user.findMany({
        take: limit,
        skip: offset,
      });
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          'An error occured while retrieving all the users. Please try again later.',
      });
    }
  },

  // Find a user by ID
  async findOne(req, res) {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          'An error occured while retrieving the user. Please try again later.',
      });
    }
  },

  // Update a user by ID
  async update(req, res) {
    const { id } = req.params;
    const { name, email, firstName, username, password, role, fonction } =
      req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id, 10) },
        data: {
          name,
          email,
          firstName,
          username,
          password: hashedPassword,
          role,
          fonction,
        },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          'An error occured while updating the user. Please try again later.',
      });
    }
  },

  // Delete a user by ID
  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.user.delete({
        where: { id: Number(id) },
      });
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          'An error occured while deleting the user. Please try again later.',
      });
    }
  },

  // Delete All users
  async deleteAll(req, res) {
    try {
      await prisma.user.deleteMany();
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          'An error occured while deleting all the users. Please try again later.',
      });
    }
  },

  // Login a user
  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await prisma.user.findFirst({
        where: { username },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect password.' });
      }

      // Authentication successful

      // Generate an authentication token
      const secretKey = process.env.JWT_SECRET;
      if (!secretKey) {
        return res.status(500).json({
          error:
            'JWT_SECRET not set in the environment. Please contact the administrator.',
        });
      }

      const token = jwt.sign({ username: user.username }, secretKey, {
        expiresIn: '1h',
      });

      // Set the token as an HTTP-only cookie
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set 'secure' to true in production
        maxAge: 3600000, // Cookie will expire after 1 hour (in milliseconds)
        sameSite: 'strict', // Adjust this based on your requirements
      });

      res.status(200).json({
        message: 'Authentication successful.',
        user: user,
        token: token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'An error occurred while logging in.',
      });
    }
  },
};

module.exports = UserController;
