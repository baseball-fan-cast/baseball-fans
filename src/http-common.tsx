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
    'Content-type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    // "Access-Control-Allow-Origin": '*'
  }
});

// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('ACCESS_TOKEN');
//   config.headers.Authorization = `Bearer ${token}`
//   return config;
// })

// client.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const { response } = error;
//     if (response.status === 401) {
//       localStorage.removeItem('ACCESS_TOKEN');
//     } else if (response.status === 404) {
//       //Show not found
//     }

//     throw error;
//   }
// );

export { client, http };
