import axios from 'axios';

export const navAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081'}/nav`,
  headers: { 'Content-Type': 'application/json' },
});

navAxios.interceptors.response.use(
  response => response,
  error => {
    console.log('error', error);
    return Promise.reject(error);
  },
);

export const navTrackAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081'}/track`,
  headers: { 'Content-Type': 'application/json' },
});

navTrackAxios.interceptors.response.use(
  response => response,
  error => {
    console.log('error', error);
    return Promise.reject(error);
  },
);
