const models = require('../models/index');
const jwt = require('jsonwebtoken');

async function userLogin(req, res) {
  const { email, password, remember } = req.body;
  const user = await models.User.findOne({ where: { email, password } });
  if (!user) {
    res.render('./login/login', {
      layout: 'login_form',
      error: 'Tài khoản hoặc mật khẩu chưa chính xác',
    });
  } else {
    const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET);
    res.cookie('access-token', accessToken);
    res.redirect('/');
  }
  // res.render('home/index', { layout: 'home', city: location });
}

module.exports = {
  userLogin,
};
