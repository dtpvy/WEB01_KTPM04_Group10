const axios = require('axios').request;

const request = ({ path, baseUrl, url, method, params, data, headers }) => {
  return new Promise((resolve, reject) => {
    axios({
      url,
      path,
      baseURL: baseUrl,
      method,
      params,
      data,
      headers: { ...headers, 'Accept-Encoding': 'gzip,deflate,compress' },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((res) => {
        reject(res.response.data);
      });
  });
};

module.exports = request;
