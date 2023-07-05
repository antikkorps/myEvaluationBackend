const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const EvaluationController = {
  // Create a new evaluation
  async create(req, res) {
    const {
      evaluation_id,
      formateur_id,
      note_totale,
      commentaire,
      date,
      contrat_id,
    } = req.body;
    try {
      const newEvaluation = await prisma.evaluation.create({
        data: {
          evaluation_id,
          formateur_id,
          note_totale,
          commentaire,
          date,
          contrat_id,
        },
      });
      res.status(201).json(newEvaluation);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Une erreur est survenue lors de la création de l'évaluation.",
      });
    }
  },

  // Get all evaluations
  async findAll(req, res) {
    try {
      const evaluations = await prisma.evaluation.findMany();
      res.status(200).json(evaluations);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          'Une erreur est survenue lors de la récupération des évaluations.',
      });
    }
  },

  // Get evaluation by ID
  async findOne(req, res) {
    const { id } = req.params;
    try {
      const evaluation = await prisma.evaluation.findUnique({
        where: { id: Number(id) },
      });
      if (!evaluation) {
        return res.status(404).json({ error: 'Évaluation non trouvée.' });
      }
      res.status(200).json(evaluation);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "Une erreur est survenue lors de la récupération de l'évaluation.",
      });
    }
  },

  // Get all published evaluations
  async findAllPublished(req, res) {
    try {
      const evaluations = await prisma.evaluation.findMany({
        where: { published: true },
      });
      res.status(200).json(evaluations);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          'Une erreur est survenue lors de la récupération des évaluations publiées.',
      });
    }
  },

  // Update evaluation by ID
  async update(req, res) {
    const { id } = req.params;
    const { name, description, date, type, status, user_id, published } =
      req.body;
    try {
      const updatedEvaluation = await prisma.evaluation.update({
        where: { id: Number(id) },
        data: {
          name,
          description,
          date,
          type,
          status,
          user_id,
          published,
        },
      });
      res.status(200).json(updatedEvaluation);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "Une erreur est survenue lors de la mise à jour de l'évaluation.",
      });
    }
  },

  // Delete evaluation by ID
  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.evaluation.delete({
        where: { id: Number(id) },
      });
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "Une erreur est survenue lors de la suppression de l'évaluation.",
      });
    }
  },

  // Delete all evaluations
  async deleteAll(req, res) {
    try {
      await prisma.evaluation.deleteMany();
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          'Une erreur est survenue lors de la suppression de toutes les évaluations.',
      });
    }
  },
};

module.exports = EvaluationController;
