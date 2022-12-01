const controller = {};

controller.default = (req, res) => {
  res.render('booking/step1', { layout: 'booking' });
};

module.exports = controller;
