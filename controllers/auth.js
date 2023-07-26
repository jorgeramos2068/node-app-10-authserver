const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
  const { email, name, password } = req.body;
  try {
    // Check email does not exist
    const userCheck = await User.findOne({ email });
    if (userCheck) {
      return res.status(400).json({
        ok: false,
        msg: 'That email is already registered in the database',
      });
    }
    // Create user
    const user = new User(req.body);
    // Hash the password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    // Generate JWT
    const token = await generateJWT(user.id, user.name);
    // Response
    await user.save();
    return res.status(201).json({
      ok: true,
      uid: user.id,
      name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
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
