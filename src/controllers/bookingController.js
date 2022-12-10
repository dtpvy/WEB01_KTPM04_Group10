const controller = {};

controller.showSearchingPage = (req, res) => {
  const busTrips = [
    {
      brandName: 'ABC',
      rating: 4,
      goTime: '10:20',
      arriveTime: '10:30',
      totalHours: '10h',
      price: '300',
    },
    {
      brandName: 'ABC',
      rating: 4,
      goTime: '10:20',
      arriveTime: '10:30',
      totalHours: '10h',
      price: '300',
    },
  ];
  onPage[0].condition = true;
  onPage[1].condition = onPage[2].condition = false;
  res.render('booking/step_1', {
    layout: 'main',
    onPage: onPage,
    busSeat: busSeat,
  });
};

controller.showStep2 = (req, res) => {
  onPage[1].condition = true;
  onPage[0].condition = onPage[2].condition = false;
  res.render('booking/step_2', { layout: 'main', onPage: onPage });
};

controller.showStep3 = (req, res) => {
  onPage[2].condition = true;
  onPage[0].condition = onPage[1].condition = false;
  res.render('booking/step_3', { layout: 'main', onPage: onPage });
};

controller.showBookedTicket = (req, res) => {
  res.render('booking/booked_ticket', { layout: 'main' });
};

controller.showCancelTicket = (req, res) => {
  res.render('booking/cancel_ticket', { layout: 'main' });
};

module.exports = controller;
