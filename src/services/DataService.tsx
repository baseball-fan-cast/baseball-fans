import { client } from '../http-common';
// import axios from 'axios';

const getAllTeams = () => {
  return client.get<never>('/mlb/teams');
};

const getAllPlayers = () => {
  return client.get<never>('/mlb/players');
};

const getPlayersByTeam = (id: string) => {
  return client.get<never>(`/mlb/players?teamId=${id}&season=2024`);
};

const getSubscription = () => {
  return client.get<never>(`/subscription`);
};

const putSubscription = (teams = [], players = []) => {
  const body = { teams, players };
  return client.put<never>(`/subscription`, body);
};

const updateSubscription = (teams: number[], players: number[]) => {
  const body = { teams, players };
  return client.patch<never>(`/subscription`, body);
};

// const getPlayer = (id: string) => {
//   return http.get<never>(`/people/${id}`);
// };

const getSeasonSchedule = (teamsId) => {
  console.log(teamsId);
  return client.get<never>(`/mlb/schedule/subscribed`);
};

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
  getAllTeams,
  getAllPlayers,
  getPlayersByTeam,
  login,
  getSubscription,
  putSubscription,
  updateSubscription,
  getSeasonSchedule
};

export default DataService;
