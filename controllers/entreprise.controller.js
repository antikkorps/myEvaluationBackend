const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const EntrepriseController = {
  // Create new Entreprise
  async create(req, res) {
    const { id, name } = req.body
    try {
      const newEntreprise = await prisma.entreprise.create({
        data: {
          id,
          name,
          address,
          city,
          zipcode,
        },
      })
      res.status(201).json(newEntreprise)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la création de l'entreprise.",
      })
    }
  },

  // Get all Entreprises
  async findAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 20
      const offset = (page - 1) * limit

      const entreprises = await prisma.entreprise.findMany({
        take: limit,
        skip: offset,
      })
      res.status(200).json(entreprises)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la récupération des entreprises.",
      })
    }
  },

  // Get Enterprise by ID
  async findOne(req, res) {
    const { id } = req.params
    try {
      const entreprise = await prisma.entreprise.findUnique({
        where: { id: Number(id) },
      })
      if (!entreprise) {
        return res.status(404).json({ error: "Entreprise non trouvée." })
      }
      res.status(200).json(entreprise)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la récupération de l'entreprise.",
      })
    }
  },

  // Update Entreprise by ID
  async update(req, res) {
    const { id } = req.params
    const { name, address, city, zipcode } = req.body
    try {
      const updatedEntreprise = await prisma.entreprise.update({
        where: { id: parseInt(id, 10) },
        data: {
          name,
          address,
          city,
          zipcode,
        },
      })
      res.status(200).json(updatedEntreprise)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la mise à jour de l'entreprise.",
      })
    }
  },

  // Delete Entreprise by ID
  async delete(req, res) {
    const { id } = req.params
    try {
      await prisma.entreprise.delete({
        where: { id: Number(id) },
      })
      res.sendStatus(204)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la suppression de l'entreprise.",
      })
    }
  },

  // Delete all Entreprises
  async deleteAll(req, res) {
    try {
      await prisma.entreprise.deleteMany()
      res.sendStatus(204)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error:
          "Une erreur est survenue lors de la suppression de toutes les entreprises.",
      })
    }
  },
}

module.exports = EntrepriseController
