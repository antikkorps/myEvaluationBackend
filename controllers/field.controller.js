const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const fieldController = {
  //create a new field
    async create(req, res) {
        const { id } = req.params
        const { type, label, form } = req.body
        try {
        const newField = await prisma.field.create({
            data: {
            id,
            type,
            label,
            form,
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
    //GET all fields
    async findAll(req, res) {
        try {
        const fields = await prisma.field.findMany()
        res.status(200).json(fields)
        } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Une erreur est survenue lors de la récupération des champs.",
        })
        }
    },
    //GET a field by id
    async findOne(req, res) {
        const { id } = req.params
        try {
        const field = await prisma.field.findUnique({
            where: { id: Number(id) },
        })
        res.status(200).json(field)
        } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Une erreur est survenue lors de la récupération du champ.",
        })
        }
    },
    //UPDATE a field
    async update(req, res) {
        const { id } = req.params
        const { type, label, form } = req.body
        try {
        const updatedField = await prisma.field.update({
            where: { id: Number(id) },
            data: {
            type,
            label,
            form,
            },
        })
        res.status(200).json(updatedField)
        } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Une erreur est survenue lors de la mise à jour du champ.",
        })
        }
    },
    //DELETE a field
    async delete(req, res) {
        const { id } = req.params
        try {
        await prisma.field.delete({
            where: { id: Number(id) },
        })
        res.status(204).end()
        } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Une erreur est survenue lors de la suppression du champ.",
        })
        }
    },

    //DELETE all fields
    async deleteAll(req, res) {
        try {
        await prisma.field.deleteMany()
        res.status(204).end()
        } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Une erreur est survenue lors de la suppression des champs.",
        })
        }
    },
}

module.exports = fieldController
