import axios from 'axios';

const http = axios.create({
  baseURL: 'https://statsapi.mlb.com/api/v1',
  headers: {
    'Content-type': 'application/json'
  }
});

const client = axios.create({
  baseURL: `https://baseball-fans-445201-288548494819.us-central1.run.app`,
  headers: {
    'Content-type': 'application/json'
  }
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  const lang = localStorage.getItem('LANG') || 'en';
  config.headers.Authorization = `Bearer ${token}`;
  config.headers['Accept-Language'] = lang;
  return config;
});

export { client, http };
