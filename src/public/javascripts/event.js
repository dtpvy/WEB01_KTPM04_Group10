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

const onAddRow = () => {
  const addRow = document.querySelector('.edit-control__add-row');
  const editing = document.querySelector('.edit-control__editing');
  editing.children[0].setAttribute('onclick', `onSaveRow()`);
  addRow.classList.toggle('d-none');
  editing.classList.toggle('d-none');
  const divContainer = document.querySelector('.edit-coach');
  const divRow = document.createElement('div');
  divRow.className = 'd-flex gap-4 align-items-center';
  const divCol = document.createElement('div');
  divCol.className = 'edit-coach__item';
  divCol.innerHTML =
    '<div class="btn-group"><button type="button" style="width: 40px; height: 40px"class="btn btn-primary rounded-circle"data-bs-toggle="dropdown"aria-expanded="false"><i class="fa-solid fa-plus"></i></button><ul class="dropdown-menu"><li><div onclick="onAddCol(`driver`)" class="dropdown-item">Ghế tài xế</div></li><li><div onclick="onAddCol(`able`)" class="dropdown-item">Ghế ngồi được</div></li><li><div onclick="onAddCol(``)" class="dropdown-item">Ghế trống</div></li></ul></div>';
  divRow.appendChild(divCol);
  divContainer.appendChild(divRow);

  const btns = document.querySelectorAll('.edit-coach__edit-btn');
  btns.forEach((btn) => btn.classList.toggle('d-none'));
};

const onAddCol = (type, index) => {
  const divContainer = document.querySelector('.edit-coach');
  const seats = index !== undefined ? divContainer.childNodes[index] : divContainer.lastChild;
  const divCol = document.createElement('div');
  divCol.className = 'edit-coach__item';
  divCol.innerHTML = "<img src='" + IMGURL_SEAT[type] + "' alt='' />";
  seats.insertBefore(divCol, seats.lastChild);
};

const onCancelRow = () => {
  const addRow = document.querySelector('.edit-control__add-row');
  const editing = document.querySelector('.edit-control__editing');

  addRow.classList.toggle('d-none');
  editing.classList.toggle('d-none');
  handleChooseFloor();
};

const onSaveRow = (index) => {
  const divContainer = document.querySelector('.edit-coach');
  const cFloor = document.getElementById('floor_choose');
  const seats = index !== undefined ? divContainer.childNodes[index] : divContainer.lastChild;
  const floor = document.getElementsByName('floor_value')[0];
  const coach = JSON.parse(floor.value);
  const arr = [];
  seats.querySelectorAll('.edit-coach__item').forEach((col) => {
    if (col.childNodes[0].getAttribute('class') === 'btn-group') return;
    const type = Object.keys(IMGURL_SEAT).find(
      (key) => IMGURL_SEAT[key] === col.childNodes[0].getAttribute('src')
    );
    arr.push(type || '');
  });

  if (!arr.length && index !== undefined) {
    coach[cFloor.value].splice(index, 1);
  } else if (index !== undefined) coach[cFloor.value][index] = arr;
  else coach[cFloor.value].push(arr);
  floor.setAttribute('value', JSON.stringify(coach));
  onCancelRow();
};

const IMGURL_SEAT = {
  driver: '/images/vô lăng.png',
  able: '/images/ghế chưa đặt.png',
};

const renderCoach = (f) => {
  const floor = document.getElementsByName('floor_value')[0];
  const coach = JSON.parse(floor.value);
  const total = document.getElementsByName('amount_seats')[0];
  const fTotal = document.getElementsByName('floor_amount_seats')[0];
  const divContainer = document.querySelector('.edit-coach');
  divContainer.innerHTML = '';
  let seatAmount = 0;
  let seatTotal = 0;
  console.log(f);
  Object.keys(coach).forEach((key) =>
    coach[key].forEach((row) =>
      row.forEach((col) => {
        seatTotal += col === 'able';
      })
    )
  );
  coach[f].forEach((row, index) => {
    const divRow = document.createElement('div');
    divRow.className = 'd-flex gap-4 align-items-center';
    row.forEach((col) => {
      seatAmount += col === 'able';
      const divCol = document.createElement('div');
      divCol.className = 'edit-coach__item';
      divCol.innerHTML = `<img src='${IMGURL_SEAT[col]}' alt='' />`;
      divRow.appendChild(divCol);
    });
    const btnEdit = document.createElement('div');
    btnEdit.style = 'width: 40px; height: 40px; position: absolute; right: -60px';
    btnEdit.className =
      'edit-coach__edit-btn d-flex align-items-center justify-content-center btn rounded-circle btn-secondary';
    btnEdit.innerHTML = '<i class="fa-solid fa-pen"></i>';
    btnEdit.addEventListener('click', () => {
      const divRow = document.createElement('div');
      divRow.className = 'd-flex gap-4 align-items-center';
      const divCol = document.createElement('div');
      divCol.className = 'edit-coach__item';
      divCol.innerHTML =
        '<div class="btn-group"><button type="button" style="width: 40px; height: 40px"class="btn btn-primary rounded-circle"data-bs-toggle="dropdown"aria-expanded="false"><i class="fa-solid fa-plus"></i></button><ul class="dropdown-menu"><li><div onclick="onAddCol(`driver`, ' +
        index +
        ')" class="dropdown-item">Ghế tài xế</div></li><li><div onclick="onAddCol(`able`, ' +
        index +
        ')" class="dropdown-item">Ghế ngồi được</div></li><li><div onclick="onAddCol(``, ' +
        index +
        ')" class="dropdown-item">Ghế trống</div></li></ul></div>';
      divRow.appendChild(divCol);
      divContainer.replaceChild(divRow, divContainer.childNodes[index]);
      const addRow = document.querySelector('.edit-control__add-row');
      const editing = document.querySelector('.edit-control__editing');
      editing.children[0].setAttribute('onclick', `onSaveRow(${index})`);
      addRow.classList.toggle('d-none');
      editing.classList.toggle('d-none');
    });
    divRow.appendChild(btnEdit);
    divContainer.appendChild(divRow);
  });
  total.value = seatTotal;
  fTotal.value = seatAmount;
};

const handleChooseFloor = () => {
  const floor = document.getElementById('floor_choose');
  renderCoach(floor.value);
};

const onChangeFloor = () => {
  const input = document.getElementsByName('floor')[0];
  const chooseFloor = document.querySelector('.edit-control__container');
  const floorSelect = document.getElementById('floor_choose');
  floorSelect.innerHTML = '';
  if (input.value < 0 || input.value > 3) {
    chooseFloor.classList.add('d-none');
    return;
  }

  const floor = document.getElementsByName('floor_value')[0];
  const defaultValue = [
    ['driver', '', 'able'],
    ['able', 'able', 'able'],
    ['able', 'able', 'able'],
    ['able', 'able', 'able'],
  ];
  const value = floor.value ? JSON.parse(floor.value) : {};
  for (let i = 0; i < input.value; i++) {
    if (!value[String.fromCharCode(65 + i)]) {
      value[String.fromCharCode(65 + i)] = defaultValue;
    }
    const option = document.createElement('option');
    option.value = String.fromCharCode(65 + i);
    option.innerHTML = option.value;
    option.selected = i === 0 ? 'selected' : '';
    floorSelect.appendChild(option);
  }

  chooseFloor.classList.remove('d-none');
  floor.setAttribute('value', JSON.stringify(value));
  handleChooseFloor();
};

try {
  const cf = document.getElementsByName('floor')[0];
  console.log(cf.value);
  if (cf.value) {
    console.log('alo');
    onChangeFloor();
  }
} catch (e) {}
