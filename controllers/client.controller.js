const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const ClientController = {
  // Créer un nouveau client
  async create(req, res) {
    const { id, name } = req.body;
    try {
      const newClient = await prisma.client.create({
        data: {
          id,
          name,
        },
      });
      res.status(201).json(newClient);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la création du client.',
      });
    }
  },

  // Récupérer tous les clients
  async findAll(req, res) {
    try {
      const clients = await prisma.client.findMany();
      res.status(200).json(clients);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la récupération des clients.',
      });
    }
  },

  // Récupérer un client par son ID
  async findOne(req, res) {
    const { id } = req.params;
    try {
      const client = await prisma.client.findUnique({
        where: { id: Number(id) },
      });
      if (!client) {
        return res.status(404).json({ error: 'Client non trouvé.' });
      }
      res.status(200).json(client);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la récupération du client.',
      });
    }
  },

  // Mettre à jour un client par son ID
  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const updatedClient = await prisma.client.update({
        where: { id: parseInt(id, 10) },
        data: {
          name,
        },
      });
      res.status(200).json(updatedClient);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la mise à jour du client.',
      });
    }
  },

  // Supprimer un client par son ID
  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.client.delete({
        where: { id: Number(id) },
      });
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la suppression du client.',
      });
    }
  },

  // Supprimer tous les clients
  async deleteAll(req, res) {
    try {
      await prisma.client.deleteMany();
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          'Une erreur est survenue lors de la suppression de tous les clients.',
      });
    }
  },
};

module.exports = ClientController;
