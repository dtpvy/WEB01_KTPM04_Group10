const controller = {};

controller.default = (req, res) => {
  res.render('./booking/booked_ticket', { layout: 'main' });
};

controller.showStep2 = (req, res) => {
  res.render('booking/step_2', { layout: 'booking' });
};

module.exports = controller;
