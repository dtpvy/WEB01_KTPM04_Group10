const controller = {};
const models = require('../models');
const sequelize = require('sequelize');
const nodemailer = require('nodemailer');

// Hàm linh tinh

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
//
controller.showBookingPage = async (req, res) => {
  let id = req.params.id;
  const user = await models.User.findByPk(req.userId);

  const route = await models.Route.findOne({
    where: { id },
    include: [
      {
        model: models.Coach,
      },
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
  const orders = await models.Order.findAll({ where: { routeId: route.id }, include: models.Seat });
  const seatBooked = orders.reduce((seatBooked, order) => {
    return [...seatBooked, ...order.Seats.map((seat) => seat.id)];
  }, []);
  console.log(seatBooked);
  const _seats = await models.Seat.findAll({ where: { coachId: route.Coach.id } });
  const seats = _seats.reduce((floor, seat) => {
    seat.status = seatBooked.find((id) => seat.id === id) ? 'booked' : seat.status;
    floor[seat.floor] = floor[seat.floor] || [];
    floor[seat.floor][seat.row] = floor[seat.floor][seat.row] || [];
    floor[seat.floor][seat.row][seat.column] = { id: seat.id, status: seat.status } || {};
    return floor;
  }, {});

  const day = new Date(route.startTime);
  const day2 = new Date(route.endTime);
  const time = timeData(day, day2);

  res.render('booking/step_1', {
    layout: 'main',
    busSeat: seats,
    floor: Object.keys(seats),
    user,
    time,
    seatChosen: 0,
    route,
    coach: route.Coach,
    coachId: route.Coach.id,
  });
};

controller.createOrder = async (req, res) => {
  const id = req.params.id;
  const { routeId, userId, payment_method, seat_value, total } = req.body;
  const seats = JSON.parse(seat_value);
  console.log(seats);
  if (payment_method == 'booking_directly_method') {
    const order = await models.Order.create({
      routeId: routeId,
      userId: userId,
      status: 'SUCCESS',
      method: 'trực tiếp',
      total,
    });
    const _seats = await models.Seat.findAll({ where: { id: seats } });
    await order.addSeats(_seats);
    const user = await models.User.findOne({
      where: {
        id: userId,
      },
    });
    //gửi mail
    let transporter = nodemailer.createTransport({
      host: 'smtp.elasticemail.com',
      port: 2525,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'webvesire@gmail.com', // ethereal user
        pass: '0F0B3BD0156B42881021E6A855B77B27035F', // ethereal password
      },
    });

    const msg = {
      from: '"The Exapress App" <webvesire@gmail.com>', // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Đặt vé của bạn đã được tạo thành công', // Subject line
      text: `Mã đơn đặt vé của bạn: ${order.id}.\n Vui lòng truy cập http://localhost:3001/booking/booked_ticket/${order.id} để truy cập xem chi tiết vé xe đã đặt.`, // plain text body
    };
    // send mail with defined transport object
    const info = await transporter.sendMail(msg);

    console.log('Message sent: %s', info.messageId);

    await res.redirect(`/booking/booked_ticket/${order.id}`);
  } else {
    console.log('chưa làm thanh toán momo');
  }
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
      {
        model: models.Seat,
      },
    ],
  });

  const seats = order.Seats.map((seat) => `${seat.floor}${seat.row}${seat.column}`).join(', ');

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
    seats,
  });
};

controller.showCancelTicket = (req, res) => {
  res.render('booking/cancel_ticket', { layout: 'main' });
};

module.exports = controller;
