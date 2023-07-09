const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const TagController = {
  // Create a new tag
  async create(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const newTag = await prisma.tag.create({
        data: {
          name,
          description,
        },
      });
      res.status(201).json(newTag);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la création du Tag.',
      });
    }
  },

  // Get all tags
  async findAll(req, res) {
    try {
      const tags = await prisma.tag.findMany();
      res.status(200).json(tags);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la récupération des tags.',
      });
    }
  },

  // Get tag by ID
  async findOne(req, res) {
    const { id } = req.params;
    try {
      const tag = await prisma.tag.findUnique({
        where: { id: Number(id) },
      });
      if (!tag) {
        return res.status(404).json({ error: 'Tag non trouvée.' });
      }
      res.status(200).json(tag);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la récupération du tag.',
      });
    }
  },

  // Update Tag by ID
  async update(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const updatedTag = await prisma.tag.update({
        where: { id: Number(id) },
        data: {
          name,
          description,
        },
      });
      res.status(200).json(updatedTag);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la mise à jour du tag.',
      });
    }
  },

  // Delete Tag by ID
  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.tag.delete({
        where: { id: Number(id) },
      });
      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la suppression du tag.',
      });
    }
  },

  // Delete all tags
  async deleteAll(req, res) {
    try {
      await prisma.tag.deleteMany();
      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de la suppression des tags.',
      });
    }
  },
};

module.exports = TagController;
