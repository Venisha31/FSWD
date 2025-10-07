// backend/src/routes/portfolio.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { getPortfolio } = require('../controllers/portfolio.controller');

router.get('/:userId', auth, getPortfolio);

module.exports = router;
