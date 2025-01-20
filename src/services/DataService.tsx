import { http, client } from '../http-common';
// import axios from 'axios';

const getAllTeams = () => {
  return client.get<never>('/mlb/teams');
};

const getAllPlayers = () => {
  return client.get<never>('/mlb/players');
};

const getPlayersByTeam = (id: string) => {
  return http.get<never>(`/teams/${id}/roster?season=2024`);
};

// const getPlayer = (id: string) => {
//   return http.get<never>(`/people/${id}`);
// };

// const getSeasonSchedule = (year: string) => {
//   return http.get<never>(`schedule?sportId=1&season=${year}&gameType=R`);
// };

// export const getIcon = async (id: string) => {
//   return await axios
//     .get(` https://midfield.mlbstatic.com/v1/team/${id}/spots/96`)
//     .then((response) => {
//       const blob = new Blob([response.data], { type: response.headers['content-type'] });
//       const image = URL.createObjectURL(blob);
//       return image;
//     })
//     .catch((err: Error) => {
//       console.error('Error response:', err);
//     });
// };

const login = (token) => {
  const body = { idToken: token };
  return client.post<never>('/auth/login', body);
};

const DataService = {
  // getPlayer,
  getAllTeams,
  getAllPlayers,
  getPlayersByTeam,
  // getSeasonSchedule,
  login
};

export default DataService;
