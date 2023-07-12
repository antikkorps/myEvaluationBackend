const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MethodeController = {
  // Créer une nouvelle méthode
  async create(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const newMethode = await prisma.methode.create({
        data: {
          name,
          description,
        },
      });
      res.status(201).json(newMethode);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la création de la méthode.',
      });
    }
  },

  // Récupérer toutes les méthodes
  async findAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const offset = (page - 1) * limit;

      const methodes = await prisma.methode.findMany({
        take: limit,
        skip: offset,
      });
      res.status(200).json(methodes);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la récupération des méthodes.',
      });
    }
  },

  // Récupérer une méthode par son ID
  async findOne(req, res) {
    const { id } = req.params;
    try {
      const methode = await prisma.methode.findUnique({
        where: { id: Number(id) },
      });
      if (!methode) {
        return res.status(404).json({ error: 'Méthode non trouvée.' });
      }
      res.status(200).json(methode);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la récupération de la méthode.',
      });
    }
  },

  // Mettre à jour une méthode par son ID
  async update(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const updatedMethode = await prisma.methode.update({
        where: { id: Number(id) },
        data: {
          name,
          description,
        },
      });
      res.status(200).json(updatedMethode);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la mise à jour de la méthode.',
      });
    }
  },

  // Supprimer une méthode par son ID
  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.methode.delete({
        where: { id: Number(id) },
      });
      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la suppression de la méthode.',
      });
    }
  },

  // Supprimer toutes les méthodes
  async deleteAll(req, res) {
    try {
      await prisma.methode.deleteMany();
      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la suppression des méthodes.',
      });
    }
  },
};

module.exports = MethodeController;
