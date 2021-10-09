import axios from 'axios';

const instance = axios.create({
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
  },
  baseURL: 'http://localhost:3000',
});

export const setAuthToken = (token: string | null): void => {
  if (token) {
    instance.defaults.headers.common.authorization = token;
  } else {
    delete instance.defaults.headers.common.authorization;
  }
};

export default instance;
