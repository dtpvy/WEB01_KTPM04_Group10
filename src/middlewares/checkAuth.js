const jwt = require('jsonwebtoken');
const models = require('../models/index');

const checkAuth = async (req, res, next) => {
  const token = req.cookies['access-token'];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.locals.user = await models.User.findByPk(decoded.userId);
  } catch (error) {}
  next();
};

module.exports = checkAuth;
