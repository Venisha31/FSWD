// backend/src/routes/stock.routes.js
const express = require('express');
const router = express.Router();
const { searchStocks, getStockQuote, getStockHistory, getAllStocks } = require('../controllers/stock.controller');

router.get('/search', searchStocks);
router.get('/quote/:symbol', getStockQuote);
router.get('/history/:symbol', getStockHistory);
router.get('/all', getAllStocks); // Test endpoint

module.exports = router;
