const models = require('../models/index');

async function userRegister(req, res) {
  const { email, password, repassword } = req.body;
  const user = await models.User.findOne({ where: { email } });
  if (password !== repassword) {
    res.render('./register/register', {
      layout: 'login_form',
      error: 'Xác nhận mật chưa chính xác. Vui lòng thử lại.',
      email,
      password,
    });
  } else if (user) {
    res.render('./register/register', {
      layout: 'login_form',
      error: 'Email đã được đăng ký. Vui lòng thử lại.',
    });
  } else {
    const user = await models.User.create({ email, password });
    console.log(user);
    res.render('./register/register', {
      layout: 'login_form',
      toastMessage: {
        type: 'success',
        message: `Đăng ký thành công, chào mừng ${user.email}`,
      },
    });
  }
}

async function coachRegister(req, res) {
  const { code, name, password, repassword } = req.body;
  let garage = await models.Garage.findOne({ where: { code } });
  console.log(password, repassword);
  if (password !== repassword) {
    res.render('./register/register_coach', {
      layout: 'login_form',
      error: 'Xác nhận mật chưa chính xác. Vui lòng thử lại.',
      code,
      name,
      password,
    });
  } else if (garage) {
    res.render('./register/register_coach', {
      layout: 'login_form',
      error: 'Mã xe đã được đăng ký. Vui lòng thử lại.',
    });
  } else {
    garage = await models.Garage.create({ code, name });
    const user = await models.User.findOne({ where: { id: req.userId } });
    await garage.addUser(user, { through: { password, role: 'owner' } });
    res.render('./register/register_coach', {
      layout: 'login_form',
      toastMessage: {
        type: 'success',
        message: `Đăng ký thành công, chúc mừng ${
          user.name || user.email
        } đã tạo thành công nhà xe ${garage.name}`,
      },
    });
  }
}

module.exports = {
  userRegister,
  coachRegister,
};
