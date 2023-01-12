function diff_hours(dt2, dt1) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
}
const formatDate = function (date) {
  let year = date.toLocaleString('default', { year: 'numeric' });
  let month = date.toLocaleString('default', { month: '2-digit' });
  let day = date.toLocaleString('default', { day: '2-digit' });

  return day + '-' + month + '-' + year;
};
const timeData = function (day1, day2) {
  const formattedDate = formatDate(day1);
  const eFormattedDate = formatDate(day2);
  return {
    startDay: formattedDate,
    startTime: `${day1.getHours() > 9 ? day1.getHours() : '0' + day1.getHours()}:${
      day1.getMinutes() > 9 ? day1.getMinutes() : '0' + day1.getMinutes()
    }`,
    endDate: eFormattedDate,
    endTime: `${day2.getHours() > 9 ? day2.getHours() : '0' + day2.getHours()}:${
      day2.getMinutes() > 9 ? day2.getMinutes() : '0' + day2.getMinutes()
    }`,
    totalHours: diff_hours(day1, day2),
  };
};

module.exports = {
  diff_hours,
  timeData,
  formatDate,
};
