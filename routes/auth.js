const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login, renew } = require('../controllers/auth');

const router = Router();

// New user
router.post(
  '/new',
  [
    check('email', 'Email is required and must be a valid mail').isEmail(),
    check('name', 'Name is required and cannot be empty').not().isEmpty(),
    check(
      'password',
      'Password is required and must be longer than 5 characters'
    ).isLength({ min: 5 }),
  ],
  createUser
);

// Login
router.post(
  '/',
  [
    check('email', 'Email is required and must be a valid mail').isEmail(),
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
