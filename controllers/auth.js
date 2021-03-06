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
      email,
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

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const userCheck = await User.findOne({ email });
    if (!userCheck) {
      return res.status(400).json({
        ok: false,
        msg: 'That email does not exist in the database',
      });
    }
    const validPassword = bcrypt.compareSync(password, userCheck.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password in invalid',
      });
    }
    // Generate JWT
    const token = await generateJWT(userCheck.id, userCheck.name);
    return res.status(200).json({
      ok: true,
      uid: userCheck.id,
      name: userCheck.name,
      email: userCheck.email,
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

const renew = async (req, res = response) => {
  const { uid } = req;
  const dbUser = await User.findById(uid);
  if (!dbUser) {
    return res.status(400).json({
      ok: false,
      msg: 'There was an error while authenticating the token',
    });
  }
  const token = await generateJWT(uid, dbUser.name);
  return res.json({
    ok: true,
    uid,
    name: dbUser.name,
    email: dbUser.email,
    token,
  });
};

module.exports = {
  createUser,
  login,
  renew,
};
