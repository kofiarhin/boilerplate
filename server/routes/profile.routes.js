const { Router } = require('express');
const { getProfile } = require('../controllers/auth.controller');
const { requireAuth } = require('../middleware/auth');

const router = Router();

router.get('/profile', requireAuth, getProfile);

module.exports = router;
