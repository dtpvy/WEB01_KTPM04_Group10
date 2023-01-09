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

//forgot-password 
const nodemailer = require('nodemailer');
const sendEmail= async (email) => {
  try{
    let transporter = nodemailer.createTransport({
      host: 'smtp.elasticemail.com',
      port: 2525,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'webvesire@gmail.com+', // ethereal user
        pass: '0F0B3BD0156B42881021E6A855B77B27035F', // ethereal password
      },
    });

    const msg = {
      from: '"The Exapress App" <webvesire@gmail.com>', // sender address
      to: `${user.email}`, // list of receivers
      subject: 'chủ đề', // Subject line
      text: `nội dung`, // plain text body
    };
    // send mail with defined transport object
    await transporter.sendMail(msg);   
  }
  catch (error) {
    console.log(error, "email not sent");
  }
}; 

module.exports = {
  userLogin,
  coachLogin,
  sendEmail,
};