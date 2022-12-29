const onLogout = async () => {
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

const toast = document.querySelector('.toast-message');
setTimeout(() => {
  if (toast && toast.style.display !== 'none') {
    onCloseToast();
  }
}, 3000);

const onCloseToast = () => {
  const toast = document.querySelector('.toast-message');
  toast.style.display = 'none';
};

const garageTabs = document.querySelectorAll('.menu-control-garage__btn');
const garageSections = document.querySelectorAll('.control-garage__section');
const addButton = document.querySelector('.menu-control-garage__btn--add');
const tabs = ['station', 'tour', 'coach', 'employee'];
let tabActive = '';
garageTabs.forEach((element, index) => {
  element.addEventListener('click', () => {
    garageTabs.forEach((btn, _index) => {
      if (index === _index) return;
      garageSections[_index + 1].classList.add('control-garage__section--hide');
      btn.classList.add('btn-outline-primary');
      btn.classList.remove('btn-primary');
    });
    element.classList.toggle('btn-outline-primary');
    element.classList.toggle('btn-primary');
    const active = element.classList.contains('btn-primary');
    if (active) {
      garageSections[index + 1].classList.remove('control-garage__section--hide');
      garageSections[0].classList.add('control-garage__section--hide');
      addButton.style.display = index + 1 !== garageTabs.length ? 'block' : 'none';
      tabActive = tabs[index];
    } else {
      garageSections[0].classList.remove('control-garage__section--hide');
      garageSections[index + 1].classList.add('control-garage__section--hide');
      addButton.style.display = 'none';
      tabActive = '';
    }
  });
});

addButton &&
  addButton.addEventListener('click', () => {
    if (tabActive) {
      onNavigateTo(`garage/${tabActive}/create`);
    }
  });

try {
  const selectorCity = document.getElementById('selector_city');
  const selectorDistrict = document.getElementById('selector_district');
  const selectorWard = document.getElementById('selector_ward');
  selectorCity.addEventListener('change', (e) => {
    selectorDistrict.innerHTML = '<option value="">Chọn quận huyện</option>';
    selectorWard.innerHTML = '<option value="">Chọn phường</option>';
    if (selectorCity.value) {
      fetch('https://provinces.open-api.vn/api/?depth=2')
        .then((response) => response.json())
        .then((data) => {
          data = data
            .find((city) => city.name === selectorCity.value)
            .districts.map((district) => district.name);
          data.forEach((item) => {
            const option = document.createElement('OPTION');
            option.setAttribute('value', item);
            const value = document.createTextNode(item);
            option.appendChild(value);
            selectorDistrict.appendChild(option);
          });
        });
    }
  });

  selectorDistrict.addEventListener('change', (e) => {
    selectorWard.innerHTML = '<option value="">Chọn phường</option>';
    if (selectorDistrict.value) {
      fetch('https://provinces.open-api.vn/api/?depth=3')
        .then((response) => response.json())
        .then((data) => {
          data = data
            .find((city) => city.name === selectorCity.value)
            .districts.find((district) => district.name === selectorDistrict.value)
            .wards.map((district) => district.name);
          data.forEach((item) => {
            const option = document.createElement('OPTION');
            option.setAttribute('value', item);
            const value = document.createTextNode(item);
            option.appendChild(value);
            selectorWard.appendChild(option);
          });
        });
    }
  });
} catch (e) {}
