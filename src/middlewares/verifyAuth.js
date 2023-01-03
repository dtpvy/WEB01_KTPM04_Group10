const jwt = require('jsonwebtoken');

const verifyAuth = async (req, res, next) => {
  const token = req.cookies['access-token'];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;
    if (!req.userId) throw new Error('UserId is empty');
    next();
  } catch (error) {
    res.redirect('/login');
  }
};

const verifyGarage = async (req, res, next) => {
  const token = req.cookies['access-token-garage'];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.garageId = decoded.garageId;
    req.userId = decoded.userId;
    if (!req.garageId || !req.userId) throw new Error('GarageId is empty');
    next();
  } catch (error) {
    res.redirect('/login');
  }
};

module.exports = { verifyAuth, verifyGarage };
