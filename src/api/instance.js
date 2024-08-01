import axios from 'axios';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const baseRequest = axios.create({
  // baseURL: 'http://127.0.0.1:5002/',
  baseURL: 'https://localizator-0241232fc251.herokuapp.com/',
  headers: {
    post: headers,
    get: headers,
    patch: headers,
    delete: headers,
  },
});

baseRequest.interceptors.request.use(
  (config) => {
    const isFormData = (obj) => obj instanceof FormData;

    if (isFormData(config.data)) {
      config.headers['Content-Type'] = 'multipart/form-data'
    }

    return config
  },
  (error) => Promise.reject(error),
);

baseRequest.interceptors.response.use(
  (config) => config,
  (error) => Promise.reject(error),
);

export { baseRequest };
