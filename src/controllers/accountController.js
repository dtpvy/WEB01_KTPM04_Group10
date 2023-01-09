const models = require('../models/index');

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
  res.render('./account/index', { layout: 'main', user });
}

module.exports = {
  logout,
  updateProfile,
  editProfile,
  getProfile,
};
