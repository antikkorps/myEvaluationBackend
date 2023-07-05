const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const RoleController = {
  // Créer un nouvel utilisateur
  async create(req, res) {
    const { id, name, slug, description } = req.body;
    try {
      const newUser = await prisma.role.create({
        data: {
          id,
          name,
          slug,
          description,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la création du rôle.',
      });
    }
  },

  // Récupérer tous les utilisateurs
  async findAll(req, res) {
    try {
      const roles = await prisma.role.findMany();
      res.status(200).json(roles);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la récupération des rôles.',
      });
    }
  },

  // Récupérer un utilisateur par son ID
  async findOne(req, res) {
    const { id } = req.params;
    try {
      const role = await prisma.role.findUnique({
        where: { id: Number(id) },
      });
      if (!role) {
        return res.status(404).json({ error: 'Rôle non trouvé.' });
      }
      res.status(200).json(role);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la récupération du rôle.',
      });
    }
  },

  // Mettre à jour un utilisateur par son ID
  async update(req, res) {
    const { id } = req.params;
    const { name, slug, description } = req.body;
    try {
      const updatedRole = await prisma.role.update({
        where: { role_id: parseInt(id, 10) },
        data: {
          name,
          slug,
          description,
        },
      });
      res.status(200).json(updatedRole);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la mise à jour du rôle.',
      });
    }
  },

  // Supprimer un utilisateur par son ID
  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.role.delete({
        where: { id: Number(id) },
      });
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la suppression du rôle.',
      });
    }
  },

  // Supprimer tous les utilisateurs
  async deleteAll(req, res) {
    try {
      await prisma.role.deleteMany();
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          'Une erreur est survenue lors de la suppression de tous les rôles.',
      });
    }
  },
};

module.exports = RoleController;
