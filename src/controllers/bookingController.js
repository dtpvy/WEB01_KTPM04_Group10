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
  res.render('booking/search', { layout: 'main', busTrips: busTrips });
};

module.exports = controller;
