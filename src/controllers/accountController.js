async function logout(req, res) {
  res.clearCookie('access-token');
  res.status(200).json({
    success: true,
  });
}

module.exports = {
  logout,
};
