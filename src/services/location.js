const request = require('../services/index');

async function getLocation(depth = 1) {
  try {
    const res = await request({ url: `https://provinces.open-api.vn/api/?depth=${depth}` });
    return res.map((item) => item.name);
  } catch (err) {
    return null;
  }
}

module.exports = {
  getLocation,
};
