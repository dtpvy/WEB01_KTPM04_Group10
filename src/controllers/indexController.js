const getLocation = require('../services/location').getLocation;

async function homePage(req, res) {
  const location = await getLocation();
  res.render('home/index', { layout: 'home', city: location });
}

module.exports = {
  homePage,
};
