const getLocation = require('../services/location').getLocation;
const models = require('../models');
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const { formatDate, timeData } = require('../utility/utility.js');

async function homePage(req, res) {
  const location = (await getLocation()).sort();

  const route = await models.Route.findAll({
    attribute: [[sequelize.fn('MIN', sequelize.col('fare')), 'fare']],
    include: [
      {
        model: models.Station,
        raw: true,

        as: 'startStation',
        require: true,
      },
      {
        model: models.Station,
        as: 'endStation',
        require: true,
      },
    ],
  });
  for (let i of route) {
    const day = new Date(i.startTime);
    const day2 = new Date(i.endTime);
    i.time = timeData(day, day2);
  }
  let newRoute = [];
  for (let i = 0; i < 6; i++) {
    newRoute.push(route[i + 1]);
  }

  console.log(location);
  res.render('home/index', { layout: 'home', city: location, route: newRoute });
}

async function searchRoute(req, res) {
  const location = (await getLocation()).sort();
  const startCity = req.query.startCity;
  const arriveCity = req.query.arriveCity;
  const priceSort = req.query.priceSort || 'lowest';
  const typeSort = req.query.typeSort;
  const garageSort = req.query.garageSort;
  let orders = {
    lowest: ['fare', 'ASC'],
    highest: ['fare', 'DESC'],
  };
  let date = req.query.day;

  let options = {
    include: [
      {
        model: models.Station,
        as: 'startStation',
        require: true,
        where: {
          city: {
            [Op.substring]: startCity || '',
          },
        },
      },
      {
        model: models.Station,
        as: 'endStation',
        require: true,
        where: {
          city: {
            [Op.substring]: arriveCity || '',
          },
        },
      },
      {
        model: models.Coach,
        require: true,
        include: [
          {
            model: models.Garage,
            require: true,
            where: {},
            include: {
              model: models.Comment,
            },
          },
        ],
        where: {},
      },
    ],
    where: {},
    order: [],
  };
  options.order.push(orders[priceSort]);
  let route = await models.Route.findAll(options);

  let typeToSort = route.map((item, ind) => item.Coach.seatAmount);
  typeToSort = [...new Set(typeToSort)];
  let garageToSort = route.map((item, ind) => item.Coach.Garage.name);
  garageToSort = [...new Set(garageToSort)];
  for (let i of route) {
    const day = new Date(i.startTime);
    const day2 = new Date(i.endTime);
    i.time = timeData(day, day2);
  }
  if (typeSort) {
    options.include[2].where.seatAmount = typeSort;
  }
  if (garageSort) {
    options.include[2].include[0].where.name = garageSort;
  }
  let newDateFormat = '';
  let check = false;
  if (date) {
    newDateFormat = `${date.substring(8)}-${date.substring(5, 7)}-${date.substring(0, 4)}`;
    route = route.filter((item) => {
      return newDateFormat === item.time.startDay;
    });
    check = true;
  }

  const url = '?' + new URLSearchParams(req.query).toString();
  numberOfCoaches = route.length;
  res.render('home/search', {
    layout: 'main',
    city: location,
    route: route,
    numberOfCoaches,
    date,
    url,
    garageToSort,
    typeToSort,
    startCity,
    arriveCity,
    newDateFormat,
    check,
  });
}

module.exports = {
  homePage,
  searchRoute,
};
