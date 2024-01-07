const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const CompanyController = {
  // Create new company
  async create(req, res) {
    const { id, name } = req.body
    try {
      const newCompany = await prisma.company.create({
        data: {
          id,
          name,
          address,
          city,
          zipcode,
          country,
          logo,
        },
      })
      res.status(201).json(newCompany)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la création de l'entreprise.",
      })
    }
  },

  // Get all companies
  async findAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 20
      const offset = (page - 1) * limit

      const companies = await prisma.company.findMany({
        take: limit,
        skip: offset,
      })
      res.status(200).json(companies)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la récupération des entreprises.",
      })
    }
  },

  // Get company by ID
  async findOne(req, res) {
    const { id } = req.params
    try {
      const company = await prisma.company.findUnique({
        where: { id: Number(id) },
      })
      if (!company) {
        return res.status(404).json({ error: "Entreprise non trouvée." })
      }
      res.status(200).json(company)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la récupération de l'entreprise.",
      })
    }
  },

  // Update company by ID
  async update(req, res) {
    const { id } = req.params
    const { name, address, city, zipcode, country } = req.body
    try {
      const updatedCompany = await prisma.company.update({
        where: { id: parseInt(id, 10) },
        data: {
          name,
          address,
          city,
          zipcode,
          country,
          logo,
        },
      })
      res.status(200).json(updatedCompany)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la mise à jour de l'entreprise.",
      })
    }
  },

  // Delete company by ID
  async delete(req, res) {
    const { id } = req.params
    try {
      await prisma.company.delete({
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

  // Delete all companies
  async deleteAll(req, res) {
    try {
      await prisma.company.deleteMany()
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

module.exports = CompanyController
