const models = require('../models/index');
const jwt = require('jsonwebtoken');
const { getLocation } = require('../services/location');

async function getGarage(req, res) {
  const garage = await models.Garage.findOne({
    where: { id: req.garageId },
    include: [
      { model: models.User },
      { model: models.Station },
      { model: models.Coach, include: models.Route },
      // { model: models.Route },
    ],
  });
  garage.Routes = await garage.Coaches.reduce(async (routes, coach) => {
    routes = [
      ...routes,
      ...(await Promise.all(
        coach.Routes.map(async (route) => {
          const [startStation, endStation] = await Promise.all([
            await models.Station.findOne({ where: { id: route.startStationId } }),
            await models.Station.findOne({ where: { id: route.endStationId } }),
          ]);
          return {
            coach,
            route,
            startStation,
            endStation,
          };
        })
      )),
    ];
    return routes;
  }, []);
  const user = garage.Users.find((user) => user.id === req.userId);
  res.render('./garage/index', { layout: 'main', garage, user });
}

async function addSection(req, res) {
  const section = req.params.section;
  if (section === 'station') {
    const location = (await getLocation(1)).sort();
    res.render(`./garage/edit-${section}`, { layout: 'main', isEdit: false, location });
    return;
  }
  res.render(`./garage/edit-${section}`, { layout: 'main', isEdit: false });
}

async function editSection(req, res) {
  const { section, id } = req.params;
  if (section === 'station') {
    const location = (await getLocation(1)).sort();
    const station = await models.Station.findOne({ where: { id, garageId: req.garageId } });
    if (!station) throw Error();
    res.render(`./garage/edit-${section}`, { layout: 'main', isEdit: false, location });
    return;
  }
  res.render(`./garage/edit-${section}`, { layout: 'main', isEdit: false });
}

async function handleAddSection(req, res) {
  const section = req.params.section;
  const { name, city, district, ward, phone, street } = req.body;
  if (section === 'station') {
    const station = await models.Station.create({
      street,
      name,
      city,
      district,
      ward,
      phone,
      garageId: req.garageId,
    });
    res.redirect(`/garage/${section}/create`);
  }
  // toastMessage: {
  //   type: 'success',
  //   message: `Đăng ký thành công, chúc mừng ${
  //     user.name || user.email
  //   } đã tạo thành công nhà xe ${garage.name}`,
  // },
}

module.exports = {
  getGarage,
  addSection,
  handleAddSection,
  editSection,
};
