const BASE_URL = `${window.location.protocol}//${window.location.host}`;

const onNavigateTo = (path) => {
  window.location.href = path === '/' ? BASE_URL : `${BASE_URL}/${path}`;
};
