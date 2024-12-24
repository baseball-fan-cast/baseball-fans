import http from '../http-common';

const getAllTeams = () => {
  return http.get<never>('/teams');
};

const getPlayer = (id: string) => {
  return http.get<never>(`/people/${id}`);
};

const DataService = {
  getPlayer,
  getAllTeams
};

export default DataService;
