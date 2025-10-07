// backend/src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { signup, login, getMe } = require('../controllers/auth.controller');

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', auth, getMe);

module.exports = router;
