const { Router } = require('express');

const router = Router();

// New user
router.post('/new', (req, res) => {
  return res.json({
    ok: true,
    msg: 'Create user',
  });
});

// Login
router.post('/', (req, res) => {
  return res.json({
    ok: true,
    msg: 'Login',
  });
});

// Validate token
router.get('/renew', (req, res) => {
  return res.json({
    ok: true,
    msg: 'Validate token',
  });
});

module.exports = router;
