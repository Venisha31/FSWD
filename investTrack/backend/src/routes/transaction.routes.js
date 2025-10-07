// backend/src/routes/transaction.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { getTransactions, buy, sell } = require('../controllers/transaction.controller');

router.get('/:userId', auth, getTransactions);
router.post('/buy', auth, buy);
router.post('/sell', auth, sell);

module.exports = router;
