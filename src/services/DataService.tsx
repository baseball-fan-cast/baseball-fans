import { http, client } from '../http-common';

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

const deleteSubscription = () => {
  return client.delete<never>(`/subscription`);
};

const putSubscription = (teams = [], players = []) => {
  const body = { teams, players };
  return client.put<never>(`/subscription`, body);
};

const updateSubscription = (teams: number[], players: number[]) => {
  const body = { teams, players };
  return client.patch<never>(`/subscription`, body);
};

const getMedia = () => {
  return client.get<never>(`/mlb/media/subscribed`);
};

const getMediaByTeamId = (teamId) => {
  return client.get<never>(`/mlb/media?teamIds=${teamId}`);
};

const getNews = () => {
  return client.get<never>(`/mlb/news`);
};

const getSeasonScheduleByIds = (teamIds, playerIds) => {
  return client.get<never>(`/mlb/schedule?teamIds=${teamIds}&playerIds=${playerIds}`);
};

const getScheduleByTeamId = (teamId) => {
  return client.get<never>(`/mlb/schedule?teamIds=${teamId}`);
};

const getSeasonSchedule = () => {
  return client.get<never>(`/mlb/schedule/subscribed`);
};

const getDigest = () => {
  return client.get<never>(`/digest/subscribed`);
};

const getDigestByIds = (teamIds, playerIds) => {
  return client.get<never>(`/digest?teamIds=${teamIds}&playerIds=${playerIds}`);
};

const getGameContent = (id) => {
  return http.get<never>(`/game/${id}/content`);
};

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
  getSeasonSchedule,
  getMedia,
  getNews,
  getSeasonScheduleByIds,
  getGameContent,
  getDigest,
  getDigestByIds,
  getMediaByTeamId,
  getScheduleByTeamId,
  deleteSubscription
};

export default DataService;
