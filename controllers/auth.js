const { response } = require('express');

const createUser = (req, res = response) => {
  const { email, name, password } = req.body;
  return res.json({
    ok: true,
    msg: 'Create user',
  });
};

const login = (req, res = response) => {
  const { email, password } = req.body;
  return res.status(200).json({
    ok: true,
    msg: 'Login',
  });
};

const renew = (req, res = response) => {
  return res.json({
    ok: true,
    msg: 'Validate token',
  });
};

module.exports = {
  createUser,
  login,
  renew,
};
