const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// GET All Products with Associated Category and Tag Data
router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag, through: ProductTag },
      ],
    });
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a Product by ID with Associated Category and Tag Data
router.get('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId, {
      include: [
        { model: Category },
        { model: Tag, through: ProductTag },
      ],
    });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a New Product
router.post('/products', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a Product by ID
router.put('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const [affectedRows] = await Product.update(req.body, {
      where: { id: productId },
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json({ message: 'Product updated successfully' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a Product by ID
router.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const affectedRows = await Product.destroy({
      where: { id: productId },
    });
    if (affectedRows === 0) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json({ message: 'Product deleted successfully' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
