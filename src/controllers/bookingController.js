const controller = {};
const models = require('../models');
const sequelize = require('sequelize');
controller.default = (req, res) => {
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
  res.render('booking/step_1', {
    layout: 'main',
    busSeat: busSeat,
  });
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
  res.locals.coach = await models.Coach.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: models.Garage,
        //     include: [
        //       {
        //         model: models.Station,
        //         required: true,
        //       },
        //     ],
        //   },
        //   {
        //     model: models.Route,
        //     required: true,
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
  res.locals.route = await models.Route.findOne({
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
  let day = new Date(res.locals.route.createdAt);
  day.getHours();

  models.Order.create({
    routeId: res.locals.route.id,
  });
  res.locals.order = await models.Order.findOne({
    where: {
      routeId: res.locals.route.id,
    },
    include: [
      {
        model: models.Route,
        required: true,
      },
    ],
  });
  res.render('booking/step_1', {
    layout: 'main',
    busSeat: busSeat,
    user: user,
    day: day,
  });
};

controller.showBookedTicket = (req, res) => {
  res.render('booking/booked_ticket', { layout: 'main' });
};

controller.showCancelTicket = (req, res) => {
  res.render('booking/cancel_ticket', { layout: 'main' });
};

module.exports = controller;
