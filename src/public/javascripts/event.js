const onSignout = async () => {
  try {
    await fetch('account/logout', {
      method: 'post',
    });
    alert('Đăng xuất thành công!');
    location.reload();
  } catch (err) {
    alert('Đăng xuất thất bại!');
  }
};
