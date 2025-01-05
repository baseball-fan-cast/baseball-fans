import axios from 'axios';

const http = axios.create({
  baseURL: 'https://statsapi.mlb.com/api/v1',
  headers: {
    'Content-type': 'application/json'
  }
});

const axiosClient = axios.create({
  baseURL: `${import.meta.env.BASE_URL}/api`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
  }
});

// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('ACCESS_TOKEN');
//   config.headers.Authorization = `Bearer ${token}`
//   return config;
// })

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      localStorage.removeItem('ACCESS_TOKEN');
    } else if (response.status === 404) {
      //Show not found
    }

    throw error;
  }
);

export { axiosClient, http };
