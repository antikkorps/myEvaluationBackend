const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const UserController = {
  // Create a new user
  async create(req, res) {
    const { name, firstName, username, email, password, role, fonction } =
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
          role,
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
      const users = await prisma.user.findMany();
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
    const { name, email, firstName, username, role, fonction } = req.body;
    try {
      const updatedUser = await prisma.user.update({
        where: { user_id: parseInt(id, 10) },
        data: {
          name,
          email,
          firstName,
          username,
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

  // login
  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Mot de passe incorrect.' });
      }

      // Authentification réussie
      // Vous pouvez générer un jeton d'authentification ou effectuer d'autres actions ici

      res.status(200).json({ message: 'Authentification réussie.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'An error occurred while logging in.',
      });
    }
  },
};

module.exports = UserController;
