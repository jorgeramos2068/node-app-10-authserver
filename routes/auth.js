const { Router } = require('express');
const { createUser, login, renew } = require('../controllers/auth');

const router = Router();

// New user
router.post('/new', createUser);

// Login
router.post('/', login);

// Validate token
router.get('/renew', renew);

module.exports = router;
