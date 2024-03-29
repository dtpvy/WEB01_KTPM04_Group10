const models = require('../models/index');
const jwt = require('jsonwebtoken');
const { getLocation, getLocationDetail } = require('../services/location');
const moment = require('moment');

async function getGarage(req, res) {
  const garage = await models.Garage.findOne({
    where: { id: req.garageId },
    include: [
      { model: models.User },
      { model: models.Station },
      {
        model: models.Coach,
        include: { model: models.Route, include: { model: models.Order, include: models.Seat } },
      },
    ],
  });
  garage.Routes = (garage.Coaches || []).reduce((routes, coach) => {
    const newRoutes = (coach.Routes || []).map((route) => {
      const seatBooked = route.Orders.reduce((total, order) => {
        return (total += order.Seats.length);
      }, 0);
      const startStation = garage.Stations.find(({ id }) => id === route.startStationId);
      const endStation = garage.Stations.find(({ id }) => id === route.endStationId);
      const time = parseFloat((route.endTime - route.startTime) / (3600 * 1000));
      return {
        coach,
        route,
        startStation,
        endStation,
        seatBooked,
        time: time.toFixed(2),
      };
    });
    return routes.length ? [...routes, ...newRoutes] : [...newRoutes];
  }, []);
  const user = garage.Users.find((user) => user.id === req.userId);
  res.render('./garage/index', { layout: 'main', garage, user });
}

const ROLE = ['employee', 'admin', 'owner'];
async function addSection(req, res) {
  const section = req.params.section;
  if (section === 'station') {
    const cities = (await getLocation()).sort();
    res.render(`./garage/edit-${section}`, { layout: 'main', isEdit: false, cities });
    return;
  } else if (section === 'employee') {
    const user = (
      await models.Garage.findOne({
        where: { id: req.garageId },
        include: { model: models.User, where: { id: req.userId } },
      })
    ).Users[0];
    const role = user.AccountGarages.role;
    const roles = ROLE.slice(
      0,
      ROLE.findIndex((item) => item === role)
    );
    res.render(`./garage/edit-${section}`, { layout: 'main', isEdit: false, roles });
    return;
  } else if (section === 'tour') {
    const garage = await models.Garage.findOne({
      where: { id: req.garageId },
      include: [{ model: models.Station }, { model: models.Coach }],
    });

    res.render(`./garage/edit-${section}`, {
      layout: 'main',
      isEdit: false,
      stations: garage.Stations,
      coaches: garage.Coaches,
    });
    return;
  }
  res.render(`./garage/edit-${section}`, { layout: 'main', isEdit: false });
}

async function editStationSection(req, res) {
  const { id } = req.params;
  const location = await getLocationDetail(3);
  const station = await models.Station.findOne({ where: { id, garageId: req.garageId } });
  if (!station) throw Error();
  const cities = location.map((item) => item.name).sort();
  const districts = location
    .find((item) => item.name === station.city)
    .districts.map((item) => item.name)
    .sort();
  const wards = location
    .find((item) => item.name === station.city)
    .districts.find((item) => item.name === station.district)
    .wards.map((item) => item.name)
    .sort();
  res.render(`./garage/edit-station`, {
    layout: 'main',
    isEdit: true,
    cities,
    districts,
    wards,
    station,
  });
}

async function editTourSection(req, res) {
  const { id } = req.params;
  const tour = await models.Route.findOne({ where: { id } });
  const garage = await models.Garage.findOne({
    where: { id: req.garageId },
    include: [{ model: models.Station }, { model: models.Coach }],
  });
  const startTime = moment(tour.startTime).format('YYYY-MM-DDThh:mm');
  const endTime = moment(tour.endTime).format('YYYY-MM-DDThh:mm');
  console.log(startTime, endTime);
  res.render(`./garage/edit-tour`, {
    layout: 'main',
    isEdit: true,
    tour,
    stations: garage.Stations,
    coaches: garage.Coaches,
    startTime,
    endTime,
  });
}

async function deleteStationSection(req, res) {
  const { id } = req.params;
  await models.Station.destroy({ where: { id }, force: false });
  res.status(200).json({ success: true });
}

async function deleteTourSection(req, res) {
  const { id } = req.params;
  await models.Route.destroy({ where: { id }, force: false });
  res.status(200).json({ success: true });
}

async function deleteCoachSection(req, res) {
  const { id } = req.params;
  await models.Coach.destroy({ where: { id }, force: false });
  res.status(200).json({ success: true });
}

async function editEmployeeSection(req, res) {
  const { id } = req.params;
  const [user, employee] = await Promise.all([
    (
      await models.Garage.findOne({
        where: { id: req.garageId },
        include: { model: models.User, where: { id: req.userId } },
      })
    ).Users[0],
    (
      await models.Garage.findOne({
        where: { id: req.garageId },
        include: { model: models.User, where: { id } },
      })
    ).Users[0],
  ]);
  const role = user.AccountGarages.role;
  if (
    ROLE.findIndex((item) => item === role) <=
    ROLE.findIndex((item) => item === employee.AccountGarages.role)
  ) {
    res.redirect('/garage');
    return;
  }
  const roles = ROLE.slice(
    0,
    ROLE.findIndex((item) => item === role)
  );
  res.render(`./garage/edit-employee`, {
    layout: 'main',
    isEdit: true,
    roles,
    employee,
  });
}

async function editCoachSection(req, res) {
  const { id } = req.params;
  console.log(id);
  const [user, coach] = await Promise.all([
    (
      await models.Garage.findOne({
        where: { id: req.garageId },
        include: { model: models.User, where: { id: req.userId } },
      })
    ).Users[0],
    (
      await models.Garage.findOne({
        where: { id: req.garageId },
        include: { model: models.Coach, where: { id }, include: models.Seat },
      })
    ).Coaches[0],
  ]);
  const role = user.AccountGarages.role;
  console.log(role);
  if (role !== 'admin' && role !== 'owner') return;
  const seats = coach.Seats.reduce((floor, seat) => {
    // console.log(floor);
    floor[seat.floor] = floor[seat.floor] || [];
    floor[seat.floor][seat.row] = floor[seat.floor][seat.row] || [];
    floor[seat.floor][seat.row][seat.column] = seat.status || '';
    return floor;
  }, {});
  res.render(`./garage/edit-coach`, {
    layout: 'main',
    isEdit: true,
    coach,
    map: JSON.stringify(seats),
    floor: Object.keys(seats).length,
  });
}

async function handleStation(req, res) {
  const id = req.params.id;
  const { name, city, district, ward, phone, street } = req.body;
  if (!id) {
    const statiaon = await models.Station.create({
      street,
      name,
      city,
      district,
      ward,
      phone,
      garageId: req.garageId,
    });
    res.redirect(`/garage/station/create`);
  } else {
    await models.Station.update(
      { street, name, city, district, ward, phone },
      {
        where: { id },
      }
    );
    res.redirect(`/garage/station/edit/${id}`);
  }
}

async function handleCoach(req, res) {
  const id = req.params.id;
  const { name, code, floor, floor_value, path_img, amount_seats: seatAmount } = req.body;
  const floorValue = JSON.parse(floor_value);
  if (!id) {
    const coach = await models.Coach.create({
      name,
      code,
      floor,
      imgUrls: [path_img],
      garageId: req.garageId,
      seatAmount,
    });
    Object.keys(floorValue).forEach((floor) => {
      floorValue[floor].forEach((rowValue, row) => {
        rowValue.forEach(async (status, column) => {
          await models.Seat.create({ status, floor, column, row, coachId: coach.id });
        });
      });
    });
    res.redirect(`/garage/coach/create`);
  } else {
    const _seats = await models.Seat.findAll({ where: { coachId: id } });
    const seats = _seats.reduce((floor, seat) => {
      floor[seat.floor] = floor[seat.floor] || [];
      floor[seat.floor][seat.row] = floor[seat.floor][seat.row] || [];
      floor[seat.floor][seat.row][seat.column] = seat.status || '';
      return floor;
    }, {});
    await models.Coach.update(
      { name, code, floor, imgUrls: [path_img], seatAmount },
      {
        where: { id },
      }
    );
    if (floor_value !== JSON.stringify(seats)) {
      await models.Seat.destroy({ where: { coachId: id }, force: false });
      Object.keys(floorValue).forEach((floor) => {
        floorValue[floor].forEach((rowValue, row) => {
          rowValue.forEach(async (status, column) => {
            await models.Seat.create({ status, floor, column, row, coachId: id });
          });
        });
      });
    }
    res.redirect(`/garage/coach/edit/${id}`);
  }
}

async function handleTour(req, res) {
  const id = req.params.id;
  const { station_start, station_end, date_end, date_start, price, coach } = req.body;
  console.log(req.body);
  if (!id) {
    const route = await models.Route.create({
      startTime: new Date(date_start),
      endTime: new Date(date_end),
      fare: price,
      startStationId: station_start,
      endStationId: station_end,
      coachId: coach,
    });
    res.redirect(`/garage/tour/create`);
  } else {
    await models.Route.update(
      {
        startTime: new Date(date_start),
        endTime: new Date(date_end),
        fare: price,
        startStationId: station_start,
        endStationId: station_end,
        coachId: coach,
      },
      {
        where: { id },
      }
    );
    res.redirect(`/garage/tour/edit/${id}`);
  }
}

//show detail nhà xe
async function showGarageDetail(req, res) {
  const id = req.params.id;
  const garage = await models.Garage.findOne({
    where: {
      id: id,
    },
  });
  const station = await models.Station.findAll({
    where: {
      garageId: id,
    },
  });
  const comment = await models.Comment.findAll({
    where: {
      garageId: id,
    },
  });
  let avgRate = 0;
  let numOfRate = 0;
  let temp = comment.map((item, ind) => {
    if (item.rate) {
      numOfRate++;
      avgRate += item.rate;
    }
  });
  avgRate = avgRate / numOfRate;
  avgRate = Math.round(avgRate * 10) / 10;
  const policy = await models.Policy.findAll();
  res.render('./detail/detail', {
    layout: 'main',
    id,
    garage,
    station,
    policy,
    avgRate,
    numOfRate,
  });
}
//show detail rating
async function showGarageRating(req, res) {
  const id = req.params.id;

  const garage = await models.Garage.findOne({
    where: {
      id: id,
    },
  });
  const comment = await models.Comment.findAll({
    where: {
      garageId: id,
    },
    include: [
      {
        model: models.User,
        require: true,
      },
    ],
  });
  let avgRate = 0;
  let numOfRate = 0;
  let temp = comment.map((item, ind) => {
    if (item.rate) {
      numOfRate++;
      avgRate += item.rate;
    }
  });
  avgRate = avgRate / numOfRate;
  avgRate = Math.round(avgRate * 10) / 10;
  res.render('./detail/rating', { layout: 'main', id, garage, comment, avgRate, numOfRate });
}
//rate garage
async function rateGarage(req, res) {
  const id = req.params.id;
  let user = await models.User.findByPk(req.userId);
  const { content, star } = req.body;
  const garage = await models.Garage.findOne({
    where: {
      id: id,
    },
  });
  const commentCreate = await models.Comment.create({
    rate: star,
    content: content,
    garageId: id,
    userId: user.id,
  }).catch((error) => console.log(error));

  res.redirect(`/garage/${id}/rating`);
}

module.exports = {
  getGarage,
  addSection,
  handleStation,
  editStationSection,
  editEmployeeSection,
  handleCoach,
  editCoachSection,
  deleteStationSection,
  handleTour,
  deleteTourSection,
  deleteCoachSection,
  showGarageDetail,
  showGarageRating,
  rateGarage,
  editTourSection,
};
