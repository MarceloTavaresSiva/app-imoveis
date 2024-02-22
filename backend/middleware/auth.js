const User = require('../models/User')
// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, 'nossosecret', (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        req.userId = decodedToken.userId;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

const checkRole = (roles) => async (req, res, next) => {
    let id = (req.user.id);

    //retrieve employee info frfindOneom DB
    const user = await User.findById(id);

    !roles.includes(user.role) ? res.status(401).json({message: "Sorry you do not have access to this route"})
      : next();
  };

module.exports = {requireAuth,  checkRole};