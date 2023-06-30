const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const ContratController = {
  // Create a new contrat
  async create(req, res) {
    const { id, name, description, published, begin_date, end_date } = req.body;
    try {
      const newContrat = await prisma.contrat.create({
        data: {
          id,
          name,
          description,
          published,
          begin_date,
          end_date,
        },
      });
      res.status(201).json(newContrat);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la création du contrat.',
      });
    }
  },

  // Get all contrats
  async findAll(req, res) {
    try {
      const contrats = await prisma.contrat.findMany();
      res.status(200).json(contrats);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la récupération des contrats.',
      });
    }
  },

  // Get a contrat by ID
  async findOne(req, res) {
    const { id } = req.params;
    try {
      const contrat = await prisma.contrat.findUnique({
        where: { id: Number(id) },
      });
      if (!contrat) {
        return res.status(404).json({ error: 'Contrat non trouvé.' });
      }
      res.status(200).json(contrat);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la récupération du contrat.',
      });
    }
  },

  // Get all published contrats
  async findAllPublished(req, res) {
    try {
      const contrats = await prisma.contrat.findMany({
        where: { published: true },
      });
      res.status(200).json(contrats);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          'Une erreur est survenue lors de la récupération des contrats publiés.',
      });
    }
  },

  // Update a contrat by ID
  async update(req, res) {
    const { id } = req.params;
    const { name, description, published, begin_date, end_date } = req.body;
    try {
      const updatedContrat = await prisma.contrat.update({
        where: { id: Number(id) },
        data: {
          name,
          description,
          published,
          begin_date,
          end_date,
        },
      });
      res.status(200).json(updatedContrat);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la mise à jour du contrat.',
      });
    }
  },

  // Delete a contrat by ID
  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.contrat.delete({
        where: { id: Number(id) },
      });
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la suppression du contrat.',
      });
    }
  },

  // Delete all contrats
  async deleteAll(req, res) {
    try {
      await prisma.contrat.deleteMany();
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          'Une erreur est survenue lors de la suppression de tous les contrats.',
      });
    }
  },
};

module.exports = ContratController;
