const models = require('../models/index');
const nodemailer = require('nodemailer');

async function logout(req, res) {
  res.clearCookie('access-token');
  res.status(200).json({
    success: true,
  });
}

async function updateProfile(req, res) {
  const { fullname, birthday, email, phone, newpassword, repassword, path_img } = req.body;
  try {
    await models.User.update(
      { fullname, phone, imgUrl: path_img, email },
      {
        where: {
          id: req.userId,
        },
      }
    );
    res.redirect('/account');
  } catch (err) {
    console.log(err);
  }
}

async function editProfile(req, res) {
  const user = await models.User.findByPk(req.userId);
  res.render('./account/edit-profile', { layout: 'main', user });
}

async function getProfile(req, res) {
  const user = await models.User.findByPk(req.userId);
  const orders = await models.Order.findAll({
    where: { userId: req.userId },
    include: {
      model: models.Route,
      include: [
        {
          model: models.Coach,
          include: models.Garage,
        },
        {
          model: models.Station,
          as: 'startStation',
          required: true,
        },
        {
          model: models.Station,
          as: 'endStation',
          required: true,
        },
      ],
    },
  });
  res.render('./account/index', { layout: 'main', user, orders });
}

async function forgetPassword(req, res) {
  const email = req.params.email || '';
  const user = await models.User.findOne({ where: { email } });
  if (!user || !email) {
    res.status(200).json({
      success: false,
    });
    return;
  }
  //gửi mail
  let transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'webvesire@gmail.com', // ethereal user
      pass: '0F0B3BD0156B42881021E6A855B77B27035F', // ethereal password
    },
  });

  const msg = {
    from: '"The Exapress App" <webvesire@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Quên mật khẩu', // Subject line
    text: `Mật khẩu của bạn là: ${user.password}.`, // plain text body
  };
  // send mail with defined transport object
  const info = await transporter.sendMail(msg);
  res.status(200).json({
    success: true,
  });
}

async function forgetCoachPassword(req, res) {
  const code = req.params.code || '';
  const garage = await models.Garage.findOne({
    where: { code },
    include: {
      model: models.User,
      where: {
        id: req.userId,
      },
    },
  });
  if (!garage || !code) {
    res.status(200).json({
      success: false,
    });
    return;
  }
  //gửi mail
  let transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'webvesire@gmail.com', // ethereal user
      pass: '0F0B3BD0156B42881021E6A855B77B27035F', // ethereal password
    },
  });

  const msg = {
    from: '"The Exapress App" <webvesire@gmail.com>', // sender address
    to: garage.Users[0].email, // list of receivers
    subject: 'Quên mật khẩu', // Subject line
    text: `Mật khẩu nhà xe ${garage.name} của bạn là: ${garage.Users[0].AccountGarages.password}.`, // plain text body
  };
  // send mail with defined transport object
  const info = await transporter.sendMail(msg);
  res.status(200).json({
    success: true,
  });
}

module.exports = {
  logout,
  updateProfile,
  editProfile,
  getProfile,
  forgetPassword,
  forgetCoachPassword,
};
