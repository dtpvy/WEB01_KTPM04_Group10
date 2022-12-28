const Handlebars = require('handlebars');

module.exports = {
  for: (from, to, incr, block) => {
    let accum = '';
    for (var i = from; i < to; i += incr) accum += block.fn(i);
    return accum;
  },
  mod: (a, b) => {
    return a % b;
  },
  or: (a, b) => {
    return a || b;
  },
  and: (a, b) => {
    return a && b;
  },
  equal: (a, b) => {
    return a === b;
  },
  min: (a, b) => {
    return a < b ? a : b;
  },
  sub: (a, b) => {
    return a - b;
  },
  slice: (arr, s, e) => {
    return (arr || []).slice(s, e);
  },
  getTitle: (a) => {
    const titles = {
      owner: 'Chủ sở hữu',
      admin: 'Quản trị viên',
      employee: 'Nhân viên',
    };
    return titles[a];
  },
  sum: (a, b) => a + b,
  getAddress: (options) => {
    const { street, ward, district, city } = options || {};
    const address = [street, ward, district, city].filter((item) => item);
    return address.join(', ');
  },
  formatNumber: (number, suffix = ' VNĐ') => {
    return number.toLocaleString('vi-VN') + suffix;
  },
  getLocation: (location, level, search) => {
    if (level === 1) {
      return location.map((item) => item.name);
    } else if (level === 2) {
      return location.find((city) => city.name === search).districts.map((item) => item.name);
    } else {
      return location
        .find((city) => city.districts.find((district) => district.name === search))
        .wards.map((item) => item.name);
    }
  },
  getCoachStatus: (routes) => {
    const time = Date.now();
    return routes.find((route) => {
      const startTime = new Date(route.startTime);
      const endTime = new Date(route.endTime);
      return startTime <= time && endTime >= time;
    })
      ? 'Đang di chuyển trong chuyến'
      : 'Xe đang nghỉ';
  },
  sortable: (field, sort) => {
    const sortType = field === sort.column ? sort.type : 'default';

    const icons = {
      default: '<i class="fas fa-sort"></i>',
      asc: '<i class="fas fa-sort-amount-down-alt"></i>',
      desc: '<i class="fas fa-sort-amount-down"></i>',
    };
    const types = {
      default: 'desc',
      asc: 'desc',
      desc: 'asc',
    };

    const type = types[sortType];
    const icon = icons[sortType];
    console.log(type, icon);
    const href = `?_sort&column=${field}&type=${type}`;
    var result = `<a href=${href}>${icon}</a>`;
    return new Handlebars.SafeString(result);
  },
};
