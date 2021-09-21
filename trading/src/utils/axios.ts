import axios from 'axios';

const instance = axios.create({
  headers: {
    'Content-type': 'application/json',
  },
});

export const setAuthToken = (token: string | null): void => {
  if (token) {
    instance.defaults.headers.common.Authorization = token;
  } else {
    delete instance.defaults.headers.common.Authorization;
  }
};

export default instance;
