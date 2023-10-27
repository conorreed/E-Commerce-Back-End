const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET All Categories with Associated Products
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Product, // Include associated products
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a Category by ID with Associated Products
router.get('/categories/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findByPk(categoryId, {
      include: Product, // Include associated products
    });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.json(category);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a New Category
router.post('/categories', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a Category by ID
router.put('/categories/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    const [affectedRows] = await Category.update(req.body, {
      where: { id: categoryId },
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.json({ message: 'Category updated successfully' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a Category by ID
router.delete('/categories/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    const affectedRows = await Category.destroy({
      where: { id: categoryId },
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.json({ message: 'Category deleted successfully' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
