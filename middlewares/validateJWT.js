const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Error in token',
    });
  }
  // Validate token
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
  } catch (error) {
    console.log('Error in token', error);
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token',
    });
  }
  next();
};

module.exports = {
  validateJWT,
};
