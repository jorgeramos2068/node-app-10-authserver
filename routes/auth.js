const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login, renew } = require('../controllers/auth');

const router = Router();

// New user
router.post('/new', createUser);

// Login
router.post(
  '/',
  [
    check('email', 'Email is required').isEmail(),
    check(
      'password',
      'Password is required and must be longer than 5 characters'
    ).isLength({ min: 5 }),
  ],
  login
);

// Validate token
router.get('/renew', renew);

module.exports = router;
