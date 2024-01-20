const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const formController = {
  //create a new form
  async create(req, res) {
    const { id } = req.params
    const { name, slug, description } = req.body
    try {
      const newForm = await prisma.form.create({
        data: {
          id,
          name,
          slug,
          description,
        },
      })
      res.status(201).json(newForm)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la création du formulaire.",
      })
    }
  },

  //adding a field to the form
  async createField(req, res) {
    const { id } = req.params
    const { name, slug, description, type } = req.body
    try {
      const newField = await prisma.field.create({
        data: {
          id,
          name,
          slug,
          description,
          type,
        },
      })
      res.status(201).json(newField)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la création du champ.",
      })
    }
  },

  //GET all forms
  async findAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 20
      const offset = (page - 1) * limit

      const forms = await prisma.form.findMany({
        take: limit,
        skip: offset,
      })
      res.status(200).json(forms)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la récupération des formulaires.",
      })
    }
  },

  //GET a form by id
  async findOne(req, res) {
    const { id } = req.params
    try {
      const form = await prisma.form.findUnique({
        where: { id: Number(id) },
      })
      if (!form) {
        return res.status(404).json({ error: "Formulaire non trouvé." })
      }
      res.status(200).json(form)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la récupération du formulaire.",
      })
    }
  },

  //update a form by its id
  async update(req, res) {
    const { id } = req.params
    const { name, slug, description } = req.body
    try {
      const updatedForm = await prisma.form.update({
        where: { id: Number(id) },
        data: {
          name,
          slug,
          description,
        },
      })
      res.status(200).json(updatedForm)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la mise à jour du formulaire.",
      })
    }
  },

  //delete a form by its id
  async delete(req, res) {
    const { id } = req.params
    try {
      const deletedForm = await prisma.form.delete({
        where: { id: Number(id) },
      })
      res.status(200).json(deletedForm)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la suppression du formulaire.",
      })
    }
  },

  //delete all forms
  async deleteAll(req, res) {
    try {
      const deletedForms = await prisma.form.deleteMany()
      res.status(200).json(deletedForms)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        error: "Une erreur est survenue lors de la suppression des formulaires.",
      })
    }
  },
}
