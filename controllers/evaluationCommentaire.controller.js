const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const EvaluationCommentaireController = {
  // Create a new evaluationCommentaire
  async create(req, res) {
    const { evaluationCommentaire_id, evaluation_id, user_id, commentaire, date } =
      req.body
    try {
      const newEvaluationCommentaire = await prisma.evaluation_Commentaire.create({
        data: {
          evaluationCommentaire_id,
          evaluation_id,
          user_id,
          commentaire,
          date,
        },
      })
      res.status(201).json(newEvaluationCommentaire)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la création du commentaire.",
      })
    }
  },

  // Get all evaluationCommentaires
  async findAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 20
      const offset = (page - 1) * limit

      const evaluationCommentaires = await prisma.evaluation_Commentaire.findMany({
        take: limit,
        skip: offset,
      })
      res.status(200).json(evaluationCommentaires)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la récupération des commentaires.",
      })
    }
  },

  // Get evaluationCommentaire by ID
  async findOne(req, res) {
    const { id } = req.params
    try {
      const evaluationCommentaire = await prisma.evaluation_Commentaire.findUnique({
        where: { id: Number(id) },
      })
      if (!evaluationCommentaire) {
        return res.status(404).json({ error: "Commentaire non trouvé." })
      }
      res.status(200).json(evaluationCommentaire)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la récupération du commentaire.",
      })
    }
  },

  // Update an evaluationCommentaire by ID
  async update(req, res) {
    const { id } = req.params
    const { evaluationCommentaire_id, evaluation_id, user_id, commentaire, date } =
      req.body
    try {
      const updatedEvaluationCommentaire = await prisma.evaluation_Commentaire.update({
        where: { id: Number(id) },
        data: {
          evaluationCommentaire_id,
          evaluation_id,
          user_id,
          commentaire,
          date,
        },
      })
      res.status(200).json(updatedEvaluationCommentaire)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la mise à jour du commentaire.",
      })
    }
  },

  //delete an evaluationCommentaire
  async delete(req, res) {
    const { id } = req.params
    try {
      await prisma.evaluation_Commentaire.delete({
        where: { id: Number(id) },
      })
      res.status(204).json()
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la suppression du commentaire.",
      })
    }
  },

  // Delete all evaluationCommentaires
  async deleteAll(req, res) {
    try {
      await prisma.evaluation_Commentaire.deleteMany()
      res.sendStatus(204)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la suppression des commentaires.",
      })
    }
  },
}

module.exports = EvaluationCommentaireController
