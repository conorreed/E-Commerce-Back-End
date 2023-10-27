const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

router.use(categoryRoutes);
router.use(productRoutes);
router.use(tagRoutes);

module.exports = router;
