const request = require('../services/index');

async function getLocation() {
  try {
    const res = await getLocationDetail(1);
    return res.map((item) => item.name);
  } catch (err) {
    return null;
  }
}

async function getLocationDetail(depth = 1) {
  try {
    const res = await request({ url: `https://provinces.open-api.vn/api/?depth=${depth}` });
    return res;
  } catch (err) {
    return null;
  }
}

module.exports = {
  getLocation,
  getLocationDetail,
};
