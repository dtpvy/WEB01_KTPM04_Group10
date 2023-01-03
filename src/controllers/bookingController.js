const controller = {};
const models = require('../models');
const sequelize = require('sequelize');

function diff_hours(dt2, dt1) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
}

const timeData = function (day, day2) {
  return {
    startDay: day.toLocaleDateString('en-US'),
    startTime: `${day.getHours() > 9 ? day.getHours() : '0' + day.getHours()}:${
      day.getMinutes() > 9 ? day.getMinutes() : '0' + day.getMinutes()
    }`,
    endTime: `${day2.getHours() > 9 ? day2.getHours() : '0' + day2.getHours()}:${
      day2.getMinutes() > 9 ? day2.getMinutes() : '0' + day2.getMinutes()
    }`,
    totalHours: diff_hours(day, day2),
  };
};

controller.showBookingPage = async (req, res) => {
  let id = req.params.id;
  const user = await models.User.findByPk(req.userId);

  const busSeat = [
    { booked: 1, seatNum: 1 },
    { booked: 1, seatNum: 2 },
    { booked: 0, seatNum: 3 },
    { booked: 0, seatNum: 4 },
    { booked: 1, seatNum: 5 },
    { booked: 0, seatNum: 6 },
    { booked: 0, seatNum: 7 },
    { booked: 1, seatNum: 8 },
    { booked: 0, seatNum: 9 },
    { booked: 1, seatNum: 10 },
  ];
  const coach = await models.Coach.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: models.Garage,
      },
    ],
  });
  // res.locals.seat = await models.Seat.findOne({
  //   where: {
  //     coachId: id,
  //   },
  //   include: [
  //     {
  //       model: models.Coach,
  //       required: true,
  //     },
  //   ],
  // });
  const route = await models.Route.findOne({
    where: {
      coachId: id,
    },
    include: [
      {
        model: models.Station,
        as: 'startStation',
        required: true,
      },
      {
        model: models.Station,
        as: 'endStation',
        required: true,
      },
    ],
  });

  models.Order.create({
    routeId: route.id,
    userId: user.id,
  });
  const order = await models.Order.findOne({
    where: {
      routeId: route.id,
    },
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: models.Route,
        required: true,
      },
    ],
  });

  const day = new Date(route.startTime);
  const day2 = new Date(route.endTime);
  const time = timeData(day, day2);

  res.render('booking/step_1', {
    layout: 'main',
    busSeat,
    user,
    time,
    seatChosen: 0,
    order,
    route,
    coach,
  });
};

controller.editOrderPage = async (req, res) => {
  let id = req.params.id;
  const user = await models.User.findByPk(req.userId);

  const busSeat = [
    { booked: 1, seatNum: 1 },
    { booked: 1, seatNum: 2 },
    { booked: 0, seatNum: 3 },
    { booked: 0, seatNum: 4 },
    { booked: 1, seatNum: 5 },
    { booked: 0, seatNum: 6 },
    { booked: 0, seatNum: 7 },
    { booked: 1, seatNum: 8 },
    { booked: 0, seatNum: 9 },
    { booked: 1, seatNum: 10 },
  ];

  let order = await models.Order.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: models.Route,
        required: true,
        include: [
          {
            model: models.Coach,
            required: true,
          },
        ],
      },
    ],
  });

  let route = await models.Route.findOne({
    where: {
      id: order.routeId,
    },
    include: [
      {
        model: models.Station,
        as: 'startStation',
        required: true,
      },
      {
        model: models.Station,
        as: 'endStation',
        required: true,
      },
    ],
  });
  const coach = await models.Coach.findOne({
    where: {
      id: route.coachId,
    },
    include: [
      {
        model: models.Garage,
        required: true,
      },
    ],
  });
  const day = new Date(route.startTime);
  const day2 = new Date(route.endTime);
  const time = timeData(day, day2);
  // res.locals.seat = await models.Seat.findOne({
  //   where: {
  //     coachId: id,
  //   },
  //   include: [
  //     {
  //       model: models.Coach,
  //       required: true,
  //     },
  //   ],
  // });

  res.render('booking/step_1', {
    layout: 'main',
    busSeat,
    user,
    seatChosen: 0,
    route,
    order,
    coach,
    time,
  });
};

controller.showBookedTicket = async (req, res) => {
  const id = req.params.id;

  const order = await models.Order.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: models.User,
        required: true,
      },
    ],
  });
  const route = await models.Route.findOne({
    where: {
      id: order.routeId,
    },
    include: [
      {
        model: models.Station,
        as: 'startStation',
        required: true,
      },
      {
        model: models.Station,
        as: 'endStation',
        required: true,
      },
      {
        model: models.Coach,
        required: true,
        // include: [
        //   {
        //     model: models.Garage,
        //     required: true,
        //   },
        // ],
      },
    ],
  });

  let garage = await models.Garage.findOne({
    where: { id: route.Coach.garageId },
    include: [{ model: models.User }],
  });

  const day = new Date(route.startTime);
  const day2 = new Date(route.endTime);
  const time = timeData(day, day2);
  let orderCreatedTime = new Date(order.createdAt);
  orderCreatedTime = orderCreatedTime.toLocaleDateString('en-US');
  res.render('booking/booked_ticket', {
    layout: 'main',
    order,
    route,
    time,
    orderCreatedTime,
    garage,
  });
};

controller.showCancelTicket = (req, res) => {
  res.render('booking/cancel_ticket', { layout: 'main' });
};

module.exports = controller;
