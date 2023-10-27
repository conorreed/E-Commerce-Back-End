const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET All Tags with Associated Product Data
router.get('/tags', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: Product, // Include associated products
    });
    res.json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a Tag by ID with Associated Product Data
router.get('/tags/:id', async (req, res) => {
  const tagId = req.params.id;
  try {
    const tag = await Tag.findByPk(tagId, {
      include: Product, // Include associated products
    });
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
    } else {
      res.json(tag);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a New Tag
router.post('/tags', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a Tag by ID
router.put('/tags/:id', async (req, res) => {
  const tagId = req.params.id;
  try {
    const [affectedRows] = await Tag.update(req.body, {
      where: { id: tagId },
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'Tag not found' });
    } else {
      res.json({ message: 'Tag updated successfully' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a Tag by ID
router.delete('/tags/:id', async (req, res) => {
  const tagId = req.params.id;
  try {
    const affectedRows = await Tag.destroy({
      where: { id: tagId },
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'Tag not found' });
    } else {
      res.json({ message: 'Tag deleted successfully' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
