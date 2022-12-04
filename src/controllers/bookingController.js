const controller = {};
const onPage = [
  { name: 'Chọn chỗ', condition: true },
  { name: 'Thông tin chi tiết', condition: false },
  { name: 'Thanh toán', condition: false },
];

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
  onPage[0].condition = true;
  onPage[1].condition = onPage[2].condition = false;
  res.render('booking/step_1', {
    layout: 'booking',
    onPage: onPage,
    busSeat: busSeat,
  });
};

controller.showStep2 = (req, res) => {
  onPage[1].condition = true;
  onPage[0].condition = onPage[2].condition = false;
  res.render('booking/step_2', { layout: 'booking', onPage: onPage });
};

controller.showStep3 = (req, res) => {
  onPage[2].condition = true;
  onPage[0].condition = onPage[1].condition = false;
  res.render('booking/step_3', { layout: 'booking', onPage: onPage });
};

controller.showBookedTicket = (req, res) => {
  res.render('booking/booked_ticket', { layout: 'booking' });
};

controller.showCancelTicket = (req, res) => {
  res.render('booking/cancel_ticket', { layout: 'booking' });
};

module.exports = controller;
