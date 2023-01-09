const models = require('../models/index');
const jwt = require('jsonwebtoken');

async function userLogin(req, res) {
  const { email, password, remember } = req.body;
  const user = await models.User.findOne({ where: { email, password } });
  if (!user) {
    res.render('./login/login', {
      layout: 'login_form',
      error: 'Tài khoản hoặc mật khẩu chưa chính xác',
      email,
    });
  } else {
    const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET);
    let options = { maxAge: remember ? 90000000 : 900000, httpOnly: true };
    console.log(options);
    res.cookie('access-token', accessToken, options);
    res.redirect('/');
  }
  // res.render('home/index', { layout: 'home', city: location });
}

async function coachLogin(req, res) {
  const { code, password, remember } = req.body;
  const garage = await models.Garage.findOne({
    where: { code },
    include: {
      model: models.User,
      where: {
        id: req.userId,
      },
    },
  });
  // console.log(garageUser, );
  if (
    !garage ||
    !garage.Users ||
    !garage.Users[0] ||
    garage.Users[0].AccountGarages.password != password
  ) {
    res.render('./login/login_coach', {
      layout: 'login_form',
      error: 'Tài khoản hoặc mật khẩu chưa chính xác',
      code,
    });
  } else {
    const accessToken = jwt.sign(
      { userId: req.userId, garageId: garage.id },
      process.env.ACCESS_TOKEN_SECRET
    );
    let options = { maxAge: remember ? 90000000 : 900000, httpOnly: true };
    console.log(options);
    res.cookie('access-token-garage', accessToken, options);
    res.redirect('/garage');
  }
}

module.exports = {
  userLogin,
  coachLogin,
};
