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

const checkLogin = async (req, res, next) => {
  const token = req.cookies['access-token'];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;
    if (!req.userId) throw new Error('UserId is empty');
    res.redirect('/');
  } catch (error) {
    next();
  }
};

const checkGarageLogin = async (req, res, next) => {
  const token = req.cookies['access-token-garage'];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.garageId = decoded.garageId;
    if (!req.garageId) throw new Error('GarageId is empty');
    res.redirect('/');
  } catch (error) {
    next();
  }
};

module.exports = { checkAuth, checkLogin, checkGarageLogin };
