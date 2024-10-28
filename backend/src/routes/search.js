const express = require('express');
const router = express.Router();

const searchController = require('../app/controllers/SearchController');
router.use('/:slug', searchController.show);
router.use('/', searchController.index);

module.exports = router;