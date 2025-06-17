import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import config from './../../config/config.js';
import errorHandler from './error.controller.js'

// ✅ Register a new user
const register = async (req, res) => {
  console.log('📥 Register request body:', req.body)
  const user = new User(req.body)
  try {
    await user.save()
    console.log('✅ Registration successful:', user.email)
    return res.status(200).json({ message: "Successfully registered!" })
  } catch (err) {
    console.error("❌ Registration Error:", err.message)
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
  }
};

// ✅ Login user and issue JWT
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).json({ error: "User not found" });

    const isMatch = user.authenticate(req.body.password);
    if (!isMatch)
      return res.status(401).json({ error: "Email and password don't match." });

    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: '1d',
    });

    res.cookie('t', token, {
      httpOnly: true,
      sameSite: 'Lax',
      path: '/',
      maxAge: 86400000 // 1 day
    });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    return res.status(401).json({ error: "Could not login" });
  }
};

// ✅ Logout: clear auth cookie
const signout = (req, res) => {
  res.clearCookie('t', { path: '/' });
  return res.status(200).json({ message: 'Signed out successfully' });
};

// ✅ Middleware: verify JWT
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
  userProperty: 'auth'
});

// ✅ Middleware: check if user is authorized to access the route
const hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id.toString() === req.auth._id;
  if (!authorized) {
    return res.status(403).json({ error: 'User is not authorized' });
  }
  next();
};

// ✅ Middleware: check if user is admin
const isAdmin = (req, res, next) => {
  if (req.profile && req.profile.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

export default {
  register,
  login,
  signout,
  requireSignin,
  hasAuthorization,
  isAdmin
};
