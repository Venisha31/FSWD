// backend/src/routes/watchlist.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const controller = require('../controllers/watchlist.controller');

router.get('/:userId', auth, controller.getWatchlist);
router.post('/add', auth, controller.add);
router.post('/remove', auth, controller.remove);

module.exports = router;
